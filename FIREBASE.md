# Ligar o banco de dados (Firebase)

O app já vem com o código de login e de banco de dados pronto. Enquanto `FIREBASE_CONFIG` estiver vazio no `index.html`, ele roda em **modo demonstração** (sem banco). Para ligar o banco, siga os passos abaixo. O plano gratuito (Spark) é suficiente para começar.

> **Já tem um projeto Firebase com outros apps?** Pode usar o mesmo. Pule o passo 1 e leia a seção "Usar um projeto que já existe" no final.

## 1. Criar o projeto
1. Acesse console.firebase.google.com e clique em **Adicionar projeto**.
2. Dê um nome (ex.: `pipoca-gourmet`). Pode desativar o Google Analytics.

## 2. Ativar o login
Em **Authentication → Método de login**, ative:
- **E-mail/senha**
- **Google** (escolha um e-mail de suporte do projeto)

## 3. Criar o banco
1. Em **Firestore Database**, clique em **Criar banco de dados**.
2. Escolha uma região (ex.: `southamerica-east1`, São Paulo) e o modo **produção**.
3. Na aba **Regras**, cole o conteúdo do arquivo `firestore.rules` deste repositório e clique em **Publicar**. (Projeto que já existe: veja a seção do final, para não apagar as regras dos outros apps.)

## 4. Pegar a configuração e colar no app
1. Em **Configurações do projeto → Seus apps**, clique no ícone `</>` (Web) e registre o app.
2. Copie o objeto `firebaseConfig` que aparece.
3. No `index.html`, procure `const FIREBASE_CONFIG=` e cole os valores nos campos.

Esses valores identificam o projeto e **não são secretos**. A proteção dos dados vem das regras do passo 3.

## 5. Autorizar os endereços
Em **Authentication → Configurações → Domínios autorizados**, adicione:
- o endereço da Vercel (ex.: `pipoca-gourmet.vercel.app`) e seu domínio próprio, se tiver;
- `seu-usuario.github.io`, se usar GitHub Pages.

`localhost` já vem autorizado. Sem isto, o login com Google dá erro de domínio.

## 6. Publicar
Envie o `index.html` atualizado ao GitHub. A Vercel publica sozinha.

## O que fica guardado
Uma coleção `pipoca_alunos`, com um documento por aluno (o ID é o do login):

| Campo | Conteúdo |
|---|---|
| name, email | nome e e-mail do aluno |
| since | data do primeiro acesso |
| done | números das aulas concluídas |
| seen | avisos já lidos no sino |
| chk | itens marcados nos checklists |
| updatedAt | última gravação |

Você vê os alunos e o progresso de cada um em **Firestore Database → Dados** e em **Authentication → Usuários**.

## Regras de segurança (resumo)
Cada aluno lê e grava somente o próprio documento. Ninguém apaga documentos pelo app. Quem não está logado não acessa nada.

## Limites desta versão
- Não há painel do professor dentro do app: o acompanhamento é feito pelo Console do Firebase.
- Os vídeos e materiais continuam no `index.html`, e não no banco.
- Se o aluno ficar sem internet ao abrir o app, o progresso não é gravado naquela sessão (o app avisa).

## Usar um projeto que já existe (vários apps no mesmo Firebase)

Funciona bem. Cada app é registrado separado dentro do mesmo projeto.

1. Em **Configurações do projeto → Seus apps → Adicionar app → Web (`</>`)**, registre este app (ex.: `pipoca-gourmet-web`) e copie o `firebaseConfig` dele.
2. Em **Authentication → Método de login**, confira se E-mail/senha e Google estão ativos. Se já estiverem, não mexa.
3. Em **Authentication → Configurações → Domínios autorizados**, **adicione** o endereço da Vercel. Não remova os que já existem.
4. Em **Firestore Database → Regras**, **não substitua** o que já está lá. Adicione, dentro de `match /databases/{database}/documents { ... }`, apenas o bloco `match /pipoca_alunos/{uid} { ... }` do arquivo `firestore.rules`, e publique.
5. Cole o `firebaseConfig` no `index.html`, em `const FIREBASE_CONFIG=`.

### O que muda ao dividir o projeto entre apps
- **Contas compartilhadas:** a lista de usuários do Authentication é uma só. Quem criar conta neste app passa a existir também nos outros, com o mesmo e-mail e senha. Os dados de cada app continuam separados, e o Console mostra todos juntos.
- **Regras compartilhadas:** o Firestore tem um único conjunto de regras para o projeto inteiro. Um erro numa regra pode expor ou travar os outros apps. Mexa com cuidado e, antes de publicar, use o **Simulador de regras** do Console.
- **Cota gratuita compartilhada:** o plano Spark tem limites diários de leitura e gravação para o projeto todo. Para poucos alunos sobra, mas confira em **Uso** se os apps crescerem.
- **Nome de coleção próprio:** este app só usa `pipoca_alunos`, então não mistura com os dados dos outros.
- **Mudar depois é possível:** quando tiver um projeto só para o Pipoca Gourmet, dá para exportar a coleção e trocar o `FIREBASE_CONFIG`. Os alunos terão de criar a conta de novo, porque o cadastro fica dentro do projeto.
