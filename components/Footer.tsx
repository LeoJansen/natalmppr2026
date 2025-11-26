import Image from "next/image";

export function Footer() {
  return (
    <footer className="mt-16 flex justify-between items-center border-t-2 px-6 py-8 text-center text-sm text-white/70">
        <div>
            <Image
                src="/logo-azul.png"
                alt="Logo da Organização"
                width={150}
                height={50}
                className="mx-auto rounded-full"
            />  

        </div>
        <div>
            © {new Date().getFullYear()} Membros e Servidores do MPPR de Foz do Iguaçu · Campanha de Doação Corporativa.
            
        </div>
      
    </footer>
  );
}
