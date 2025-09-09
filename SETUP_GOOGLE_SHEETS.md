# 📊 Configuração Google Sheets + Apps Script

## Passo 1: Criar a Planilha

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha em branco
3. Renomeie para "Leads Trendly Projects"
4. Renomeie a primeira aba para "Leads"

## Passo 2: Configurar o Google Apps Script

### 2.1 Abrir o Editor de Scripts
1. Na planilha, clique em **Extensões** > **Apps Script**
2. Uma nova aba será aberta com o editor de código

### 2.2 Adicionar o Código
1. Delete todo o código existente
2. Copie TODO o conteúdo do arquivo `google-apps-script.js`
3. Cole no editor do Apps Script
4. **IMPORTANTE**: No código, altere a linha:
   ```javascript
   const EMAIL_TO_NOTIFY = 'seu-email@trendly.com.br';
   ```
   Para o email que receberá notificações de novos leads

### 2.3 Salvar o Projeto
1. Clique em **Arquivo** > **Salvar**
2. Nomeie o projeto como "Trendly Forms Handler"

## Passo 3: Fazer o Deploy do Apps Script

### 3.1 Criar Nova Implantação
1. Clique em **Implantar** > **Nova implantação**
2. Clique no ícone de engrenagem ⚙️ > **Aplicativo da Web**

### 3.2 Configurar a Implantação
Configure exatamente assim:
- **Descrição**: "Receber dados do formulário"
- **Executar como**: **Eu** (sua conta)
- **Quem tem acesso**: **Qualquer pessoa** ⚠️ IMPORTANTE

### 3.3 Autorizar e Implantar
1. Clique em **Implantar**
2. Clique em **Autorizar acesso**
3. Escolha sua conta Google
4. Clique em **Avançado** > **Ir para Trendly Forms Handler (não seguro)**
5. Clique em **Permitir**

### 3.4 Copiar a URL do Web App
1. Após a implantação, você verá uma URL como:
   ```
   https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec
   ```
2. **COPIE ESTA URL** - você precisará dela!

## Passo 4: Configurar o Formulário HTML

1. Abra o arquivo `index.html`
2. Localize a linha (aproximadamente linha 296):
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
   ```
3. Substitua `YOUR_GOOGLE_APPS_SCRIPT_URL` pela URL copiada do Apps Script:
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxXXXXX.../exec';
   ```

## Passo 5: Configurar a Planilha (Opcional)

Execute a função de setup para formatar a planilha automaticamente:

1. No editor do Apps Script
2. No menu dropdown de funções, selecione `setupSheet`
3. Clique em **▶ Executar**
4. Autorize se solicitado

Isso irá:
- Criar os cabeçalhos formatados
- Ajustar largura das colunas
- Adicionar validações de dados
- Congelar a linha de cabeçalho

## Passo 6: Testar o Sistema

### Teste Local
1. Abra o `index.html` no navegador
2. Preencha o formulário completo
3. Verifique se os dados aparecem na planilha
4. Verifique se recebeu email de notificação (se for lead qualificado)

### Teste de Produção
Após fazer deploy no Vercel:
1. Acesse seu domínio
2. Preencha o formulário
3. Confirme que os dados foram salvos

## 📋 Checklist de Verificação

- [ ] Planilha criada com aba "Leads"
- [ ] Código do Apps Script colado e salvo
- [ ] Email de notificação configurado
- [ ] Deploy do Apps Script realizado
- [ ] URL do Apps Script copiada
- [ ] URL adicionada no arquivo HTML
- [ ] Teste local funcionando
- [ ] Dados aparecendo na planilha

## 🔧 Solução de Problemas

### Erro: "Não foi possível salvar os dados"
- Verifique se a URL do Apps Script está correta no HTML
- Confirme que o deploy foi feito com acesso "Qualquer pessoa"
- Teste a URL do Apps Script diretamente no navegador (deve mostrar uma mensagem)

### Não recebo emails de notificação
- Verifique se configurou o EMAIL_TO_NOTIFY no código
- Confirme que o lead está sendo qualificado (pontuação >= 80)
- Verifique a pasta de spam

### Dados não aparecem na planilha
- Verifique se a aba da planilha se chama "Leads"
- Confirme que você autorizou o Apps Script
- Verifique o console do navegador para erros

## 🎯 Funcionalidades do Sistema

### O que o sistema faz:
1. **Recebe dados** do formulário via POST
2. **Salva na planilha** com timestamp
3. **Envia email** quando lead é qualificado
4. **Formata dados** automaticamente
5. **Valida informações** antes de salvar

### Dados coletados:
- Informações pessoais (Nome, Email, Telefone)
- Respostas do questionário
- Pontuação calculada
- Status de qualificação
- Consentimentos LGPD
- Metadados (data/hora, URL, navegador)

## 📊 Acessando os Dados

### Via Google Sheets
1. Abra a planilha "Leads Trendly Projects"
2. Os dados estarão na aba "Leads"
3. Use filtros e ordenação conforme necessário
4. Exporte como Excel ou CSV se precisar

### Criar Dashboard (Opcional)
1. Use o Google Data Studio
2. Conecte com sua planilha
3. Crie visualizações e métricas
4. Compartilhe com a equipe

## 🔒 Segurança

### Importante sobre segurança:
- Os dados são enviados via HTTPS
- A planilha só é acessível por você
- O Apps Script roda com suas permissões
- Não compartilhe a URL do Apps Script publicamente
- Faça backup regular da planilha

### LGPD Compliance:
- O sistema coleta consentimento explícito
- Armazena aceite de termos
- Permite opt-in para marketing
- Dados podem ser deletados sob solicitação

## 📞 Suporte

Em caso de dúvidas:
1. Verifique esta documentação
2. Consulte os logs do Apps Script (Ver > Registros)
3. Teste com o console do navegador aberto (F12)
4. Entre em contato com o suporte técnico