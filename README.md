# Pipoca Gourmet — Formação

App de formação em HTML puro, instalável no celular (PWA). **Não usa banco de dados nem servidor:** o nome, as aulas concluídas, os avisos lidos e os checklists ficam salvos no próprio aparelho de cada aluno.

Tem: Home, Aulas (41 aulas com vídeo em português), Materiais (12 PDFs gerados no aparelho), Perfil (conquistas, certificado, backup) e central de avisos.

## Arquivos

```
index.html            # o app inteiro (HTML + CSS + JS + imagens)
jspdf.umd.min.js      # biblioteca de PDF (local, funciona sem internet)
manifest.webmanifest  # dados para instalar como aplicativo
sw.js                 # permite abrir o app sem internet
icon-192.png, icon-512.png
vercel.json           # cabeçalhos de segurança para a Vercel
```

Não há `package.json` nem etapa de build. **Envie todos os arquivos juntos** para o GitHub.

## Subir no GitHub e publicar na Vercel

1. No repositório, **Add file → Upload files**, arraste todos os arquivos desta pasta e confirme com **Commit changes**.
2. Na Vercel, o projeto ligado ao repositório publica sozinho em cerca de 1 minuto. Se for um projeto novo: **Add New → Project**, escolha o repositório, deixe **Framework Preset** em "Other" e clique em **Deploy**.
3. Se o repositório tiver sobras de versões anteriores (`firestore.rules`, `FIREBASE.md`), pode apagar. Elas não são mais usadas.

## Instalar no celular

- **Android (Chrome):** menu ⋮ → **Instalar app**.
- **iPhone (Safari):** botão Compartilhar → **Adicionar à Tela de Início**.

Instalado, o app abre em tela cheia e o navegador não apaga os dados por inatividade, o que pode acontecer no Safari com sites não instalados.

## Onde editar

| O que | Procure por |
|---|---|
| Módulos, aulas e vídeos | `const MODS=` (cada aula é `["Título","ID_DO_VIDEO"]`) |
| Materiais em PDF | `const MAT=` |
| Cores | `:root{--bg:` |

O ID do vídeo é o código depois de `v=` no link do YouTube. Em `https://www.youtube.com/watch?v=OdIpKSwoenY`, o ID é `OdIpKSwoenY`.

Depois de mudar o `index.html`, aumente o número em `const V = "pg-v1"` no `sw.js` (ex.: `pg-v2`) para os celulares pegarem a versão nova mais rápido.

## Limitações

- **Sem sincronização:** o progresso fica em um único aparelho. Trocar de celular ou limpar os dados do navegador apaga tudo. Por isso existe **Perfil → Configurações → Baixar backup / Restaurar backup**.
- **Sem acompanhamento do professor:** como nada vai para um servidor, não dá para ver quem estudou o quê.
- **Sem senha:** o app só pede o nome. Quem usar o mesmo celular vê o mesmo progresso.
- **Internet necessária para os vídeos** (YouTube) e para a fonte Poppins na primeira abertura. Os vídeos são de terceiros e podem ser removidos pelo dono.
- **Avisos** aparecem dentro do app. Push com o app fechado não existe nesta versão.
