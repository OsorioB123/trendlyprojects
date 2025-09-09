/**
 * Google Apps Script para receber dados do formulário Trendly Projects
 * 
 * INSTRUÇÕES:
 * 1. Crie uma nova planilha no Google Sheets
 * 2. Vá em Extensões > Apps Script
 * 3. Delete todo o código e cole este
 * 4. Execute a função setupSheet() primeiro
 * 5. Depois implante como Web App
 */

// Configurações da planilha
const SHEET_NAME = 'Leads'; // Nome da aba na planilha
const EMAIL_TO_NOTIFY = 'seu-email@trendlycorp.com'; // ALTERE AQUI: Email para receber notificações

// Função principal que recebe dados POST do formulário
function doPost(e) {
  try {
    // Verifica se recebeu dados POST
    if (!e || !e.postData) {
      throw new Error('Nenhum dado POST recebido');
    }

    // Parse dos dados recebidos
    const data = JSON.parse(e.postData.contents);
    
    // Log para debug
    console.log('Dados recebidos:', data);
    
    // Abre a planilha ativa
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      throw new Error(`Aba "${SHEET_NAME}" não encontrada. Execute setupSheet() primeiro.`);
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
    
    console.log('Dados salvos na planilha:', row);
    
    // Envia email de notificação se configurado e qualificado
    if (EMAIL_TO_NOTIFY !== 'seu-email@trendlycorp.com' && data.qualifiedForProjects) {
      sendEmailNotification(data);
    }
    
    // Retorna sucesso
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Lead salvo com sucesso',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
    
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
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Função para lidar com requisições GET (teste)
function doGet(e) {
  console.log('Requisição GET recebida');
  
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: 'Google Apps Script funcionando!',
      instructions: 'Use POST para enviar dados do formulário.',
      timestamp: new Date().toISOString(),
      sheetConfigured: checkSheetConfiguration()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Função para verificar se a planilha está configurada
function checkSheetConfiguration() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    return sheet ? true : false;
  } catch (error) {
    return false;
  }
}

// Função para testar o salvamento (EXECUTE ESTA PARA TESTAR)
function testSaveData() {
  try {
    console.log('Iniciando teste de salvamento...');
    
    // Dados de teste
    const testData = {
      fullName: 'Teste Manual ' + new Date().getTime(),
      email: 'teste@example.com',
      phone: '(11) 99999-9999',
      companyMoment: 'Teste de conexão',
      mainDesire: 'Verificar funcionamento',
      involvementLevel: 'Alto',
      investmentCapacity: 'Teste',
      projectTiming: 'Imediato',
      aiVision: 'Positiva',
      totalPoints: 100,
      qualifiedForProjects: true,
      lgpdAccepted: true,
      marketingAccepted: true,
      userAgent: 'Manual Test',
      pageUrl: 'https://test.local'
    };
    
    // Simula o objeto 'e' do doPost
    const mockEvent = {
      postData: {
        contents: JSON.stringify(testData)
      }
    };
    
    // Chama doPost com dados de teste
    const result = doPost(mockEvent);
    
    console.log('Resultado do teste:', result.getContent());
    
    return 'Teste concluído! Verifique os logs e a planilha.';
    
  } catch (error) {
    console.error('Erro no teste:', error);
    return 'Erro no teste: ' + error.toString();
  }
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
    
    console.log('Email de notificação enviado para:', EMAIL_TO_NOTIFY);
    
  } catch (error) {
    console.error('Erro ao enviar email:', error);
  }
}

// Função para criar a planilha com formatação inicial (EXECUTE PRIMEIRO)
function setupSheet() {
  try {
    console.log('Configurando planilha...');
    
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Verifica se já existe a aba
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      // Cria a aba se não existir
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      console.log('Aba "' + SHEET_NAME + '" criada.');
    } else {
      console.log('Aba "' + SHEET_NAME + '" já existe.');
    }
    
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
    
    // Se a primeira linha estiver vazia, adiciona os cabeçalhos
    if (sheet.getRange(1, 1).getValue() === '') {
      sheet.appendRow(headers);
      console.log('Cabeçalhos adicionados.');
    } else {
      console.log('Cabeçalhos já existem.');
    }
    
    // Formata os cabeçalhos
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#f3f4f6');
    headerRange.setHorizontalAlignment('center');
    
    // Ajusta a largura das colunas
    const columnWidths = [150, 200, 200, 150, 250, 250, 250, 250, 200, 200, 100, 150, 100, 100, 200, 300];
    columnWidths.forEach((width, index) => {
      sheet.setColumnWidth(index + 1, width);
    });
    
    // Congela a primeira linha (cabeçalhos)
    sheet.setFrozenRows(1);
    
    // Formata colunas específicas
    sheet.getRange(2, 11, 1000, 1).setNumberFormat('0'); // Pontuação como número
    sheet.getRange(2, 1, 1000, 1).setNumberFormat('dd/mm/yyyy hh:mm:ss'); // Data/hora
    
    SpreadsheetApp.flush();
    
    console.log('Planilha configurada com sucesso!');
    return 'Planilha "' + SHEET_NAME + '" configurada com sucesso!';
    
  } catch (error) {
    console.error('Erro ao configurar planilha:', error);
    return 'Erro: ' + error.toString();
  }
}

// Função para listar todas as abas (debug)
function listSheets() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = spreadsheet.getSheets();
  
  console.log('Abas na planilha:');
  sheets.forEach((sheet, index) => {
    console.log(`${index + 1}. ${sheet.getName()}`);
  });
  
  return sheets.map(sheet => sheet.getName());
}