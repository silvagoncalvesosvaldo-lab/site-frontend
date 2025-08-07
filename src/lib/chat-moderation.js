const numberWords = [
  'zero', 'um', 'uma', 'dois', 'duas', 'três', 'tres', 'quatro', 'cinco', 
  'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 
  'catorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove', 'vinte'
];

const contactKeywords = [
  'whatsapp', 'whats', 'zap', 'telegram', 'contato', 'telefone', 'celular', 
  'email', 'e-mail', 'mail', 'pix', 'arroba', 'ponto com'
];

const patterns = {
  phone: /(\(?\d{2}\)?\s?)?(\d{4,5}-?\d{4})/g,
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  numberWordsSequence: new RegExp(`(?:${numberWords.join('|')})[\\s,-]+(?:${numberWords.join('|')})[\\s,-]+(?:${numberWords.join('|')})`, 'i'),
  contactKeywords: new RegExp(`\\b(${contactKeywords.join('|')})\\b`, 'i')
};

export const moderateMessage = (text) => {
  const normalizedText = text.toLowerCase().trim();

  if (patterns.phone.test(normalizedText)) {
    return { isAllowed: false, reason: "O compartilhamento de números de telefone não é permitido." };
  }

  if (patterns.email.test(normalizedText)) {
    return { isAllowed: false, reason: "O compartilhamento de endereços de e-mail não é permitido." };
  }

  if (patterns.contactKeywords.test(normalizedText)) {
    return { isAllowed: false, reason: "Por favor, não compartilhe informações de contato ou métodos de pagamento externos." };
  }
  
  if (patterns.numberWordsSequence.test(normalizedText)) {
    return { isAllowed: false, reason: "Sua mensagem parece conter um número de telefone. Por favor, não compartilhe informações de contato." };
  }

  return { isAllowed: true };
};