/**
 * Google Apps Script para receber dados do formulário Trendly Projects
 * 
 * INSTRUÇÕES:
 * 1. Crie uma nova planilha no Google Sheets
 * 2. Vá em Extensões > Apps Script
 * 3. Delete todo o código e cole este
 * 4. Clique em "Implantar" > "Nova implantação"
 * 5. Tipo: "Aplicativo da Web"
 * 6. Executar como: "Eu"
 * 7. Quem tem acesso: "Qualquer pessoa"
 * 8. Copie a URL gerada e cole no formulário HTML
 */

// Configurações da planilha
const SHEET_NAME = 'Leads'; // Nome da aba na planilha
const EMAIL_TO_NOTIFY = 'seu-email@trendly.com.br'; // Email para receber notificações

function doPost(e) {
  try {
    // Parse dos dados recebidos
    const data = JSON.parse(e.postData.contents);
    
    // Abre a planilha ativa
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME) || 
                  SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);
    
    // Se a planilha estiver vazia, adiciona os cabeçalhos
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Data/Hora',
        'Nome Completo',
        'Email',
        'Telefone',
        'Momento da Empresa',
        'Desejo Principal',
        'Nível de Envolvimento',
        'Capacidade de Investimento',
        'Timing do Projeto',
        'Visão sobre IA',
        'Pontuação Total',
        'Qualificado para Projects',
        'Aceite LGPD',
        'Aceite Marketing',
        'URL da Página',
        'User Agent'
      ];
      sheet.appendRow(headers);
      
      // Formata a primeira linha como cabeçalho
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#f3f4f6');
    }
    
    // Prepara os dados para inserir na planilha
    const row = [
      new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
      data.fullName || '',
      data.email || '',
      data.phone || '',
      data.companyMoment || '',
      data.mainDesire || '',
      data.involvementLevel || '',
      data.investmentCapacity || '',
      data.projectTiming || '',
      data.aiVision || '',
      data.totalPoints || 0,
      data.qualifiedForProjects ? 'SIM' : 'NÃO',
      data.lgpdAccepted ? 'SIM' : 'NÃO',
      data.marketingAccepted ? 'SIM' : 'NÃO',
      data.pageUrl || '',
      data.userAgent || ''
    ];
    
    // Adiciona a linha na planilha
    sheet.appendRow(row);
    
    // Envia email de notificação se configurado
    if (EMAIL_TO_NOTIFY && data.qualifiedForProjects) {
      sendEmailNotification(data);
    }
    
    // Retorna sucesso
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Lead salvo com sucesso'
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*');
    
  } catch (error) {
    // Log do erro para debug
    console.error('Erro ao processar dados:', error);
    
    // Retorna erro
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Erro ao salvar lead',
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*');
  }
}

// Função para lidar com requisições GET (teste)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: 'Google Apps Script funcionando! Use POST para enviar dados.'
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*');
}

// Função para enviar email de notificação
function sendEmailNotification(data) {
  try {
    const subject = `🎯 Novo Lead Qualificado - ${data.fullName}`;
    
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1f2937;">Novo Lead Qualificado para Trendly Projects</h2>
        
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Dados do Lead:</h3>
          
          <p><strong>Nome:</strong> ${data.fullName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Telefone:</strong> ${data.phone}</p>
          <p><strong>Pontuação:</strong> ${data.totalPoints} pontos</p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          
          <h4 style="color: #374151;">Respostas do Questionário:</h4>
          <p><strong>Momento da Empresa:</strong> ${data.companyMoment || 'Não informado'}</p>
          <p><strong>Desejo Principal:</strong> ${data.mainDesire || 'Não informado'}</p>
          <p><strong>Nível de Envolvimento:</strong> ${data.involvementLevel || 'Não informado'}</p>
          <p><strong>Capacidade de Investimento:</strong> ${data.investmentCapacity || 'Não informado'}</p>
          <p><strong>Timing do Projeto:</strong> ${data.projectTiming || 'Não informado'}</p>
          <p><strong>Visão sobre IA:</strong> ${data.aiVision || 'Não informado'}</p>
        </div>
        
        <div style="background: #10b981; color: white; padding: 15px; border-radius: 8px; text-align: center;">
          <p style="margin: 0; font-size: 16px;">
            <strong>Este lead está qualificado para o Trendly Projects!</strong>
          </p>
          <p style="margin: 10px 0 0 0;">
            Entre em contato em até 24 horas para melhor conversão.
          </p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 8px;">
          <p style="margin: 0; color: #92400e;">
            <strong>WhatsApp:</strong> 
            <a href="https://wa.me/55${data.phone.replace(/\D/g, '')}" style="color: #0891b2;">
              Clique aqui para enviar mensagem
            </a>
          </p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="color: #6b7280; font-size: 12px;">
          Lead capturado em: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
        </p>
      </div>
    `;
    
    MailApp.sendEmail({
      to: EMAIL_TO_NOTIFY,
      subject: subject,
      htmlBody: htmlBody
    });
    
  } catch (error) {
    console.error('Erro ao enviar email:', error);
  }
}

// Função para criar a planilha com formatação inicial (executar uma vez)
function setupSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
  
  // Define os cabeçalhos
  const headers = [
    'Data/Hora',
    'Nome Completo',
    'Email',
    'Telefone',
    'Momento da Empresa',
    'Desejo Principal',
    'Nível de Envolvimento',
    'Capacidade de Investimento',
    'Timing do Projeto',
    'Visão sobre IA',
    'Pontuação Total',
    'Qualificado para Projects',
    'Aceite LGPD',
    'Aceite Marketing',
    'URL da Página',
    'User Agent'
  ];
  
  // Se a planilha estiver vazia, adiciona os cabeçalhos
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }
  
  // Formata os cabeçalhos
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#f3f4f6');
  headerRange.setHorizontalAlignment('center');
  
  // Ajusta a largura das colunas
  sheet.setColumnWidth(1, 150); // Data/Hora
  sheet.setColumnWidth(2, 200); // Nome
  sheet.setColumnWidth(3, 200); // Email
  sheet.setColumnWidth(4, 150); // Telefone
  sheet.setColumnWidth(5, 250); // Momento da Empresa
  sheet.setColumnWidth(6, 250); // Desejo Principal
  sheet.setColumnWidth(7, 250); // Nível de Envolvimento
  sheet.setColumnWidth(8, 250); // Capacidade de Investimento
  sheet.setColumnWidth(9, 200); // Timing
  sheet.setColumnWidth(10, 200); // Visão IA
  sheet.setColumnWidth(11, 100); // Pontuação
  sheet.setColumnWidth(12, 150); // Qualificado
  sheet.setColumnWidth(13, 100); // LGPD
  sheet.setColumnWidth(14, 100); // Marketing
  sheet.setColumnWidth(15, 200); // URL
  sheet.setColumnWidth(16, 300); // User Agent
  
  // Congela a primeira linha (cabeçalhos)
  sheet.setFrozenRows(1);
  
  // Adiciona validação de dados para colunas booleanas
  const booleanColumns = [12, 13, 14]; // Qualificado, LGPD, Marketing
  booleanColumns.forEach(col => {
    const range = sheet.getRange(2, col, 1000, 1);
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['SIM', 'NÃO'], true)
      .build();
    range.setDataValidation(rule);
  });
  
  // Formata coluna de pontuação como número
  sheet.getRange(2, 11, 1000, 1).setNumberFormat('0');
  
  // Formata coluna de data/hora
  sheet.getRange(2, 1, 1000, 1).setNumberFormat('dd/mm/yyyy hh:mm:ss');
  
  SpreadsheetApp.flush();
  
  return 'Planilha configurada com sucesso!';
}