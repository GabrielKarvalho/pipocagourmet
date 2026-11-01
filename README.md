# Pipoca Gourmet — Formação

App de formação em HTML puro (um único arquivo, sem build): login, Home, Aulas (41 aulas com vídeo em português), Materiais (12 PDFs gerados no navegador) e Perfil.

## Estrutura

```
index.html       # o app inteiro (HTML + CSS + JS + imagens)
firestore.rules  # regras de segurança do banco (colar no Firebase)
FIREBASE.md      # passo a passo para ligar o banco de dados
vercel.json      # cabeçalhos de segurança para a Vercel
README.md
.gitignore
```

Não há `package.json` nem etapa de build.

## Subir no GitHub

```bash
git init
git add .
git commit -m "Pipoca Gourmet: primeira versão"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/pipoca-gourmet.git
git push -u origin main
```

## Hospedar na Vercel

1. Em vercel.com, clique em **Add New → Project** e importe o repositório do GitHub.
2. Em **Framework Preset**, deixe **Other**. Deixe **Build Command** e **Output Directory** em branco.
3. Clique em **Deploy**. O endereço sai no formato `https://pipoca-gourmet.vercel.app`.

Cada `git push` na branch `main` publica uma nova versão automaticamente.

Alternativa pelo terminal: `npx vercel --prod` dentro da pasta.

> Teste sempre pelo endereço https. Abrir o `index.html` direto do computador faz o YouTube bloquear os vídeos.

## Onde editar

Procure estes trechos no `index.html`:

| O que | Procure por |
|---|---|
| Módulos, aulas e vídeos | `const MODS=` (cada aula é `["Título","ID_DO_VIDEO"]`) |
| Materiais em PDF (textos) | `const MAT=` |
| Cores | `:root{--bg:` |

O ID do vídeo é o código depois de `v=` no link do YouTube. Em `https://www.youtube.com/watch?v=OdIpKSwoenY`, o ID é `OdIpKSwoenY`.

## Banco de dados e login

O app usa **Firebase** (login por e-mail/senha e Google + banco Firestore para guardar o progresso de cada aluno). Veja o passo a passo em [FIREBASE.md](FIREBASE.md).

Enquanto o Firebase não estiver configurado, o app funciona em **modo demonstração**: o login aceita qualquer e-mail e o progresso fica só no aparelho.

## Limitações atuais

- **Notificações** são avisos dentro do app. Push com o app fechado não existe nesta versão.
- **Internet necessária** para o player do YouTube, para a fonte Poppins, para a biblioteca de PDF (jsPDF) e para o Firebase.
- Os vídeos são de terceiros: o dono pode remover ou bloquear a incorporação.
