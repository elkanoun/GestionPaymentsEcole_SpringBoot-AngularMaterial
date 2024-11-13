package smartsofts.api.ensetdemospringang.services;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import smartsofts.api.ensetdemospringang.dtos.NewPaymentDTO;
import smartsofts.api.ensetdemospringang.entities.Payment;
import smartsofts.api.ensetdemospringang.entities.PaymentStatus;
import smartsofts.api.ensetdemospringang.entities.PaymentType;
import smartsofts.api.ensetdemospringang.entities.Student;
import smartsofts.api.ensetdemospringang.repository.PaymentRepository;
import smartsofts.api.ensetdemospringang.repository.StudentRepository;

@Service
@Transactional
public class PaymentService {

	private StudentRepository studentRepository;
	private PaymentRepository paymentRepository;

	public PaymentService(StudentRepository studentRepository, PaymentRepository paymentRepository) {
		this.studentRepository = studentRepository;
		this.paymentRepository = paymentRepository;
	}
    
	//method save payment
	public Payment savePayment(MultipartFile file, NewPaymentDTO newPaymentDTO) throws IOException{
		Path folderPath = Paths.get(System.getProperty("user.home"),"enset-data","payments");
		if(!Files.exists(folderPath)) {
			Files.createDirectories(folderPath);
		}
		String fileName = UUID.randomUUID().toString();
		Path filePath = Paths.get(System.getProperty("user.home"),"enset-data","payments",fileName+".pdf");
		Files.copy(file.getInputStream(), filePath);
		Student student = studentRepository.findByCode(newPaymentDTO.getStudentCode());
		Payment payment = Payment.builder()
				.date(newPaymentDTO.getDate())
				.type(newPaymentDTO.getType())
				.student(student)
				.amount(newPaymentDTO.getAmount())
				.file(filePath.toUri().toString())
				.status(PaymentStatus.CREATED)
				.build();

		return paymentRepository.save(payment);
	}
    
	//method update paymentStatus
	public Payment updatePaymentStatus(PaymentStatus status, @PathVariable Long id) {
		Payment payment=paymentRepository.findById(id).get();
		payment.setStatus(status);
		return paymentRepository.save(payment);
	}
	
	//method get paymentFile
	public byte[] getPaymentFile(Long paymentId) throws IOException{
		Payment payment = paymentRepository.findById(paymentId).get();
		return Files.readAllBytes(Path.of(URI.create(payment.getFile())));
	}


}
