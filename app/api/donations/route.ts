import { NextResponse } from "next/server";
import { GOOGLE_APPS_SCRIPT_URL } from "@/lib/api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const upstreamUrl = GOOGLE_APPS_SCRIPT_URL;

export async function GET() {
    try {
        const response = await fetch(upstreamUrl, { cache: "no-store" });

        if (!response.ok) {
            return NextResponse.json(
                { error: "Falha ao carregar os dados" },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("[donations][GET]", error);
        return NextResponse.json(
            { error: "Não foi possível carregar os dados agora." },
            { status: 502 }
        );
    }
}

export async function POST(request: Request) {
    try {
        // Accept both JSON and text bodies to keep compatibility with Apps Script expectations
        const bodyText = await request.text();

        const response = await fetch(upstreamUrl, {
            method: "POST",
            body: bodyText,
            headers: {
                "Content-Type": "text/plain",
            },
        });

        const contentType = response.headers.get("content-type") ?? "";

        if (!response.ok) {
            const errorPayload = contentType.includes("application/json")
                ? await response.json()
                : await response.text();

            return NextResponse.json(
                { error: "Falha ao encaminhar a doação", details: errorPayload },
                { status: response.status }
            );
        }

        if (contentType.includes("application/json")) {
            const data = await response.json();
            return NextResponse.json(data);
        }

        const text = await response.text();
        return new NextResponse(text, {
            status: 200,
            headers: { "content-type": contentType || "text/plain" },
        });
    } catch (error) {
        console.error("[donations][POST]", error);
        return NextResponse.json(
            { error: "Não foi possível enviar sua doação agora." },
            { status: 502 }
        );
    }
}
