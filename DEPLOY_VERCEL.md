# 🚀 Deploy no Vercel - Guia Completo

## Pré-requisitos

- [ ] Conta no [GitHub](https://github.com)
- [ ] Conta no [Vercel](https://vercel.com)
- [ ] Google Sheets configurado (veja SETUP_GOOGLE_SHEETS.md)
- [ ] URL do Google Apps Script obtida

## Passo 1: Preparar o Projeto

### 1.1 Atualizar o arquivo HTML
1. Abra `index.html`
2. Localize e substitua:
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
   ```
   Por sua URL real do Apps Script:
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
   ```

### 1.2 Personalizar WhatsApp (Opcional)
No arquivo `index.html`, linha ~140, atualize o número do WhatsApp:
```html
<a href="https://api.whatsapp.com/send?phone=5511999999999&text=..." 
```
Substitua `5511999999999` pelo seu número real

## Passo 2: Criar Repositório no GitHub

### 2.1 Criar novo repositório
1. Acesse [github.com/new](https://github.com/new)
2. Nome do repositório: `trendly-forms`
3. Descrição: "Formulário de qualificação Trendly Projects"
4. Privacidade: **Privado** (recomendado)
5. Clique em **Create repository**

### 2.2 Fazer upload dos arquivos

#### Opção A: Via Interface Web
1. No repositório criado, clique em **uploading an existing file**
2. Arraste todos os arquivos:
   - `index.html`
   - `vercel.json`
   - `.gitignore`
   - `google-apps-script.js` (para referência)
   - `SETUP_GOOGLE_SHEETS.md`
   - `DEPLOY_VERCEL.md`
3. Commit message: "Initial commit - Formulário Trendly"
4. Clique em **Commit changes**

#### Opção B: Via Git (Terminal)
```bash
git init
git add .
git commit -m "Initial commit - Formulário Trendly"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/trendly-forms.git
git push -u origin main
```

## Passo 3: Deploy no Vercel

### 3.1 Conectar Vercel ao GitHub
1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub
3. Clique em **New Project**

### 3.2 Importar o Projeto
1. Na lista de repositórios, encontre `trendly-forms`
2. Clique em **Import**

### 3.3 Configurar o Projeto
1. **Project Name**: `trendly-forms` (ou outro nome)
2. **Framework Preset**: `Other` (não é Next.js/React)
3. **Root Directory**: `.` (deixe vazio)
4. **Build Command**: deixe vazio
5. **Output Directory**: deixe vazio
6. **Install Command**: deixe vazio

### 3.4 Deploy
1. Clique em **Deploy**
2. Aguarde o deploy (cerca de 1 minuto)
3. Você verá "Congratulations!" quando terminar

## Passo 4: Configurar Domínio Personalizado

### 4.1 Acessar Configurações
1. No projeto no Vercel, clique em **Settings**
2. No menu lateral, clique em **Domains**

### 4.2 Adicionar Domínio
1. Digite seu domínio: `forms.trendly.com.br`
2. Clique em **Add**

### 4.3 Configurar DNS

#### Para subdomínio (recomendado):
Adicione no seu provedor de DNS:
```
Tipo: CNAME
Nome: forms
Valor: cname.vercel-dns.com
TTL: 3600
```

#### Para domínio raiz:
```
Tipo: A
Nome: @
Valor: 76.76.21.21
TTL: 3600
```

### 4.4 Verificar Configuração
1. Aguarde propagação DNS (5-30 minutos)
2. O Vercel mostrará ✓ quando estiver pronto
3. Acesse seu domínio para testar

## Passo 5: Testar o Sistema Completo

### 5.1 Teste de Formulário
1. Acesse seu domínio: `https://forms.trendly.com.br`
2. Preencha o formulário completo
3. Complete todas as etapas até o final

### 5.2 Verificar Dados
1. Abra sua planilha Google Sheets
2. Verifique se o lead foi adicionado
3. Se qualificado, verifique se recebeu email

### 5.3 Teste de Responsividade
1. Teste em dispositivo móvel
2. Teste em tablet
3. Teste em diferentes navegadores

## 📋 Checklist Final

### Configuração:
- [ ] URL do Apps Script configurada no HTML
- [ ] Número do WhatsApp atualizado
- [ ] Código no GitHub
- [ ] Deploy no Vercel concluído
- [ ] Domínio configurado e funcionando

### Testes:
- [ ] Formulário carrega corretamente
- [ ] Validações funcionando
- [ ] Dados salvos no Google Sheets
- [ ] Email de notificação enviado
- [ ] Links do WhatsApp funcionando
- [ ] Site responsivo em mobile

## 🔧 Solução de Problemas

### Erro 404 no domínio
- Verifique configuração DNS
- Aguarde propagação (até 48h)
- Confirme que o domínio está verificado no Vercel

### Formulário não envia dados
- Verifique URL do Apps Script no HTML
- Confirme que Apps Script está com acesso "Qualquer pessoa"
- Abra Console do navegador (F12) para ver erros

### Site não atualiza após mudanças
1. Faça commit das mudanças no GitHub
2. Vercel fará deploy automático
3. Limpe cache do navegador (Ctrl+F5)

## 🔄 Atualizações Futuras

### Para atualizar o formulário:
1. Edite os arquivos localmente
2. Faça commit e push para GitHub:
   ```bash
   git add .
   git commit -m "Descrição da mudança"
   git push
   ```
3. Vercel fará deploy automático em ~1 minuto

### Para atualizar Apps Script:
1. Edite o código no editor do Apps Script
2. Clique em **Implantar** > **Gerenciar implantações**
3. Clique em **Editar** 🖊️
4. Versão: **Nova versão**
5. Clique em **Implantar**
6. A URL permanece a mesma!

## 📊 Monitoramento

### Analytics do Vercel
1. No painel do Vercel, clique em **Analytics**
2. Veja visitantes, page views, etc.

### Google Analytics (Opcional)
Adicione antes do `</head>` no HTML:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎯 Próximos Passos

1. **Backup Regular**: Exporte a planilha semanalmente
2. **Integração CRM**: Conecte com RD Station, Pipedrive, etc
3. **Automação**: Configure Zapier/Make para automações
4. **A/B Testing**: Teste diferentes versões do formulário
5. **Remarketing**: Configure pixels do Facebook/Google

## 📞 Suporte

### Recursos:
- [Documentação Vercel](https://vercel.com/docs)
- [Status Vercel](https://www.vercel-status.com/)
- [Comunidade Vercel](https://github.com/vercel/next.js/discussions)

### Problemas comuns:
- Cache do navegador: Limpe com Ctrl+Shift+R
- DNS não propaga: Use [dnschecker.org](https://dnschecker.org)
- Deploy falhou: Verifique logs no Vercel

## 🎉 Parabéns!

Seu formulário está no ar e coletando leads! 

Lembre-se de:
- Monitorar a planilha regularmente
- Responder leads rapidamente (< 24h)
- Fazer backup dos dados
- Analisar métricas de conversão