// src/services/conversationService.js

const medicalResponses = {
    // Greetings
    'hi': 'Hello! How can I assist you with your medical needs today?',
    'hello': 'Hi there! I\'m here to help with any medical questions or concerns you may have.',
    'good morning': 'Good morning! How are you feeling today?',
    'good afternoon': 'Good afternoon! What can I help you with?',
    'good evening': 'Good evening! How may I assist you?',
  
    // Health inquiries
    'how are you': 'I\'m doing well, thank you for asking! How are you feeling today? Any health concerns I can help with?',
    'how are you doing': 'I\'m here and ready to help! How has your health been lately?',
    
    // Medical questions
    'i have a headache': 'I\'m sorry to hear about your headache. How long have you been experiencing this? Is it a dull ache or sharp pain?',
    'headache': 'Headaches can have various causes. When did it start and how would you rate the pain from 1-10?',
    'i feel sick': 'I\'m sorry you\'re not feeling well. Can you describe your symptoms? Do you have fever, nausea, or other specific concerns?',
    'fever': 'A fever can indicate your body is fighting an infection. Have you taken your temperature? Any other symptoms?',
    'stomach pain': 'Stomach pain can range from mild to severe. Where exactly is the pain located and when did it start?',
    'chest pain': 'Chest pain should be taken seriously. Is it sharp or dull? Does it worsen with breathing or movement? Please consider seeking immediate medical attention if severe.',
    
    // Appointment related
    'appointment': 'I can help you with appointment information. Are you looking to schedule, reschedule, or check an existing appointment?',
    'schedule appointment': 'I\'d be happy to help you schedule an appointment. What type of visit do you need - routine checkup, specific concern, or follow-up?',
    'cancel appointment': 'I can assist with appointment cancellation. Do you have your appointment reference number?',
    
    // Medication
    'medication': 'Do you have questions about a current medication, need refill information, or want to discuss side effects?',
    'prescription': 'For prescription inquiries, I can provide general information. What specific medication questions do you have?',
    'side effects': 'Side effects can vary by medication. Which medication are you concerned about?',
    
    // General health
    'diabetes': 'Diabetes management is important for your health. Are you looking for information about blood sugar monitoring, diet, or medication?',
    'blood pressure': 'Blood pressure monitoring is crucial. Have you been tracking your readings? Any specific concerns?',
    'weight loss': 'Weight management involves diet and exercise. Are you looking for a structured program or general guidance?',
    'exercise': 'Regular exercise is great for overall health! Are you starting a new routine or have specific fitness questions?',
    
    // Emergency
    'emergency': 'For medical emergencies, please call 911 immediately or go to your nearest emergency room. Is this an urgent situation?',
    'urgent': 'If this is a medical emergency, please call 911. For urgent but non-emergency care, we can discuss your options.',
    
    // Insurance/billing
    'insurance': 'I can provide general information about insurance coverage. What specific insurance questions do you have?',
    'billing': 'For billing inquiries, our billing department can provide detailed information. What type of billing question do you have?',
    'cost': 'Healthcare costs can vary based on services and insurance. What specific cost information are you looking for?',
    
    // Thanks and goodbye
    'thank you': 'You\'re very welcome! Is there anything else I can help you with regarding your health?',
    'thanks': 'Happy to help! Feel free to reach out if you have any other medical questions.',
    'bye': 'Take care of yourself! Don\'t hesitate to contact us if you need any medical assistance.',
    'goodbye': 'Goodbye! Wishing you good health. Contact us anytime you need medical support.',
    
    // Default responses
    'help': 'I\'m here to assist with medical questions, appointment scheduling, medication inquiries, and general health information. What do you need help with?',
    'what can you do': 'I can help with medical questions, appointment scheduling, medication information, symptom discussions, and connecting you with appropriate care. How can I assist you today?'
  };
  
  export const getResponse = (message) => {
    const normalizedMessage = message.toLowerCase().trim();
    
    // Check for exact matches first
    if (medicalResponses[normalizedMessage]) {
      return medicalResponses[normalizedMessage];
    }
    
    // Check for partial matches
    for (const [key, response] of Object.entries(medicalResponses)) {
      if (normalizedMessage.includes(key)) {
        return response;
      }
    }
    
    // Default response for unmatched messages
    return "I understand you're reaching out about a health concern. Could you please provide more details so I can better assist you? You can ask about symptoms, appointments, medications, or any other medical questions.";
  };
  
  // Export available conversation starters for reference
  export const conversationStarters = [
    "hi",
    "how are you",
    "i have a headache",
    "i feel sick",
    "appointment",
    "medication",
    "help"
  ];