package stms.backend.service;

import org.springframework.stereotype.Service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import org.springframework.beans.factory.annotation.Value;


@Service
public class SmsService {
	
	  @Value("${twilio.account-sid}")
	  private String accountSid;
	  
	  @Value("${twilio.auth-token}")
	  private String authToken;
	  
	  @Value("${twilio.phone-number}")
	  private String fromPhoneNumber;
	  
	  public String sendSms(String to, String textMessage) {
		  
		  Twilio.init(accountSid,authToken);
		  
		  Message message = Message.creator(
				  new PhoneNumber(to),
				  new PhoneNumber(fromPhoneNumber),
				  textMessage
				  ).create();
		  return message.getSid();
	  }

}
