<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificado - Natal da Nossa Casa 2026</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <!-- Fontes ajustadas para combinar com o site (Serif elegante + Sans moderna) -->
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;600&family=Pinyon+Script&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        :root {
            /* Paleta extraída da imagem do site */
            --midnight-blue: #0a1a36; /* Fundo escuro do site */
            --text-blue: #0f254a; /* Azul escuro para texto no papel */
            --periwinkle: #5d8bff; /* Azul do "2026" e botão */
            --gold-accent: #d4a045; /* Dourado do "10 anos" */
            --paper-bg: #fdfdfc;
            --white: #ffffff;
        }

        body {
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, var(--midnight-blue) 0%, #162a52 100%); /* Fundo igual ao site */
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Inter', sans-serif;
        }

        /* --- Controles --- */
        .controls {
            position: fixed;
            top: 20px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 12px 25px;
            border-radius: 50px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 20px rgba(0,0,0,0.4);
            z-index: 100;
            display: flex;
            gap: 15px;
            align-items: center;
            flex-wrap: wrap;
            justify-content: center;
        }
        
        .controls label { color: var(--white); font-weight: 500; }

        .controls input {
            padding: 8px 15px;
            border: 1px solid rgba(255,255,255,0.3);
            background: rgba(0,0,0,0.3);
            color: white;
            border-radius: 20px;
            font-size: 16px;
            width: 200px;
            outline: none;
        }
        
        .btn-primary {
            background-color: var(--periwinkle);
            color: white;
            border: none;
            padding: 8px 25px;
            border-radius: 20px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
            box-shadow: 0 4px 10px rgba(93, 139, 255, 0.3);
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .btn-primary:hover {
            background-color: #4a75e6;
            transform: translateY(-1px);
        }

        .btn-magic {
            background: linear-gradient(135deg, #d4a045 0%, #f6d365 100%);
            color: var(--midnight-blue);
            border: none;
            padding: 8px 25px;
            border-radius: 20px;
            cursor: pointer;
            font-weight: 700;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(212, 160, 69, 0.4);
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .btn-magic:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(212, 160, 69, 0.6);
        }
        .btn-magic:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
        }

        /* --- Folha A4 --- */
        .paper {
            width: 1123px;
            height: 794px;
            background-color: var(--paper-bg);
            position: relative;
            box-shadow: 0 20px 60px rgba(0,0,0,0.6);
            padding: 50px;
            box-sizing: border-box;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            /* Textura de papel nobre */
            background-image: url("https://www.transparenttextures.com/patterns/cream-paper.png");
            background-blend-mode: multiply;
        }

        /* --- Molduras e Decoração --- */
        .border-thick {
            position: absolute;
            top: 20px; left: 20px; right: 20px; bottom: 20px;
            border: 4px solid var(--text-blue);
        }
        
        .border-thin {
            position: absolute;
            top: 30px; left: 30px; right: 30px; bottom: 30px;
            border: 1px solid var(--gold-accent);
        }

        /* Elemento decorativo nos cantos (Meia-lua moderna) */
        .corner-accent {
            position: absolute;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: 1px solid var(--periwinkle);
            opacity: 0.5;
        }
        .tl { top: -40px; left: -40px; }
        .tr { top: -40px; right: -40px; }
        .br { bottom: -40px; right: -40px; }
        .bl { bottom: -40px; left: -40px; }

        /* --- Conteúdo --- */
        .header {
            text-align: center;
            margin-top: 20px;
            margin-bottom: 30px;
            position: relative;
            z-index: 10;
        }

        .campaign-year {
            font-family: 'Playfair Display', serif;
            font-size: 80px;
            line-height: 1;
            color: var(--text-blue);
            margin: 0;
            font-weight: 700;
        }
        
        .campaign-year span {
            color: var(--periwinkle); /* O azul claro do site */
        }

        .badge-10-years {
            display: inline-block;
            border: 1px solid var(--gold-accent);
            color: var(--gold-accent);
            border-radius: 50px;
            padding: 8px 24px;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-top: 15px;
            font-weight: 500;
            background: transparent;
        }

        .content-body {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            width: 85%;
            z-index: 10;
        }

        .certify-text {
            font-family: 'Inter', sans-serif;
            font-size: 16px;
            text-transform: uppercase;
            letter-spacing: 3px;
            color: #666;
            margin-bottom: 20px;
        }

        .donor-name {
            font-family: 'Pinyon Script', cursive;
            font-size: 95px; /* Tamanho generoso */
            color: var(--text-blue);
            line-height: 1.2;
            padding: 0 20px;
            margin-bottom: 30px;
            text-shadow: 2px 2px 0px rgba(93, 139, 255, 0.1);
        }

        .message {
            font-family: 'Playfair Display', serif;
            font-size: 24px;
            line-height: 1.5;
            color: #444;
            max-width: 800px;
            min-height: 100px; /* Evita pulo ao trocar texto */
            transition: opacity 0.3s ease;
        }
        
        .message strong {
            color: var(--text-blue);
            font-weight: 700;
        }

        .footer {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding: 0 60px;
            margin-bottom: 40px;
            z-index: 10;
        }

        .signature {
            text-align: center;
        }
        .sig-line {
            width: 220px;
            height: 1px;
            background: var(--text-blue);
            margin-bottom: 8px;
            opacity: 0.3;
        }
        .sig-role {
            font-family: 'Inter', sans-serif;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: var(--text-blue);
            font-weight: 600;
        }

        .light-glow {
            position: absolute;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(93, 139, 255, 0.08) 0%, rgba(255,255,255,0) 70%);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 0;
            pointer-events: none;
        }

        @media print {
            body { background: none; display: block; }
            .controls { display: none; }
            .paper { box-shadow: none; margin: 0; page-break-after: always; }
            @page { size: landscape; margin: 0; }
        }
    </style>
</head>
<body>

    <!-- Controles -->
    <div class="controls">
        <label>Doador:</label>
        <input type="text" id="nameInput" value="Dra. Ana Silveira">
        
        <button class="btn-magic" id="btnMagic" onclick="generateAIMessage()">
            <i class="fa-solid fa-wand-magic-sparkles"></i> Criar Mensagem com IA
        </button>

        <button class="btn-primary" onclick="window.print()">
            <i class="fa-solid fa-print"></i> Gerar PDF
        </button>
    </div>

    <!-- Certificado -->
    <div class="paper">
        <!-- Decorações -->
        <div class="border-thick"></div>
        <div class="border-thin"></div>
        <div class="corner-accent tl"></div>
        <div class="corner-accent tr"></div>
        <div class="corner-accent bl"></div>
        <div class="corner-accent br"></div>
        <div class="light-glow"></div>

        <!-- Cabeçalho com Identidade do Site -->
        <div class="header">
            <h1 class="campaign-year">Natal da Nossa Casa <span>2026</span></h1>
            <div class="badge-10-years">10 anos de história</div>
        </div>

        <!-- Corpo -->
        <div class="content-body">
            <div class="certify-text">Certificado de Gratidão conferido a</div>
            
            <div class="donor-name" id="certName">Dra. Ana Silveira</div>
            
            <div class="message" id="certMessage">
                Por manter acesa a chama do cuidado que aquece cada família do nosso MPPR.
                Sua doação garante um lugar à mesa para aqueles que cuidam de nós todos os dias.
            </div>
        </div>

        <!-- Rodapé -->
        <div class="footer">
            <div class="signature">
                <div style="font-family: 'Pinyon Script'; font-size: 28px; margin-bottom: 5px; color: #666;">Comissão 2026</div>
                <div class="sig-line"></div>
                <div class="sig-role">Organização MPPR</div>
            </div>

            <div style="text-align: center; opacity: 0.8;">
                <i class="fa-solid fa-house-chimney" style="color: var(--periwinkle); font-size: 24px; margin-bottom: 5px;"></i>
                <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: var(--text-blue);">Foz do Iguaçu</div>
            </div>

            <div class="signature">
                <div style="font-family: 'Inter'; font-size: 14px; margin-bottom: 10px; color: #666;" id="dateDisplay">Dezembro, 2026</div>
                <div class="sig-line"></div>
                <div class="sig-role">Data da Emissão</div>
            </div>
        </div>

    </div>

    <script>
        const nameInput = document.getElementById('nameInput');
        const certName = document.getElementById('certName');
        const certMessage = document.getElementById('certMessage');
        const btnMagic = document.getElementById('btnMagic');
        
        // Atualiza nome em tempo real
        nameInput.addEventListener('input', (e) => {
            certName.textContent = e.target.value || 'Nome do Doador';
        });

        // Configuração da API Gemini
        const apiKey = ""; // Será preenchido pelo ambiente

        async function generateAIMessage() {
            const donorName = nameInput.value;
            const originalText = btnMagic.innerHTML;
            
            // Estado de carregamento
            btnMagic.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Criando...';
            btnMagic.disabled = true;
            certMessage.style.opacity = '0.5';

            try {
                // Prompt cuidadosamente construído para tom emocional e institucional
                const prompt = `Escreva uma mensagem de agradecimento curta (máximo 25 palavras) e muito elegante para um certificado de doação de Natal. 
                A campanha é "Natal da Nossa Casa" do Ministério Público (MPPR). 
                O doador é "${donorName}". 
                O foco é agradecer por ajudar a colocar comida na mesa dos funcionários terceirizados (limpeza/segurança).
                Use tom poético, nobre e caloroso. Não use aspas.`;

                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: prompt
                            }]
                        }]
                    })
                });

                if (!response.ok) throw new Error('Falha na API');

                const data = await response.json();
                const aiText = data.candidates[0].content.parts[0].text;

                // Atualiza o texto com efeito suave
                certMessage.style.opacity = '0';
                setTimeout(() => {
                    certMessage.innerText = aiText;
                    certMessage.style.opacity = '1';
                }, 300);

            } catch (error) {
                console.error("Erro ao gerar texto:", error);
                alert("Não foi possível gerar a mensagem agora. Tente novamente.");
                certMessage.style.opacity = '1';
            } finally {
                btnMagic.innerHTML = originalText;
                btnMagic.disabled = false;
            }
        }
    </script>
</body>
</html>