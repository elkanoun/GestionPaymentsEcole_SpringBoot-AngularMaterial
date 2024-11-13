package smartsofts.api.ensetdemospringang.dtos;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import smartsofts.api.ensetdemospringang.entities.PaymentType;


@Getter @Setter @NoArgsConstructor @AllArgsConstructor  
public class NewPaymentDTO {
	
	private double amount;
	
	private PaymentType type;
	
	private LocalDate date;
	
	private String studentCode;
	
}
