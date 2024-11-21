package smartsofts.api.ensetdemospringang.web;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import smartsofts.api.ensetdemospringang.dtos.NewPaymentDTO;
import smartsofts.api.ensetdemospringang.entities.Payment;
import smartsofts.api.ensetdemospringang.entities.PaymentStatus;
import smartsofts.api.ensetdemospringang.entities.PaymentType;
import smartsofts.api.ensetdemospringang.entities.Student;
import smartsofts.api.ensetdemospringang.repository.PaymentRepository;
import smartsofts.api.ensetdemospringang.repository.StudentRepository;
import smartsofts.api.ensetdemospringang.services.PaymentService;

@RestController
@CrossOrigin("*")
public class PaymentRestController {
	
	private StudentRepository studentRepository;
	private PaymentRepository paymentRepository;
	private PaymentService paymentService;
	
	public PaymentRestController(StudentRepository studentRepository, PaymentRepository paymentRepository, PaymentService paymentService ) {
		this.studentRepository = studentRepository;
		this.paymentRepository = paymentRepository;
		this.paymentService = paymentService;
	}
	
	@GetMapping(path = "/payments")
	public List<Payment> allPayments(){
		return paymentRepository.findAll();
	}
	
	@GetMapping(path = "/students/{code}/payments")
	public List<Payment> paymentsByStudent(@PathVariable String code){
		return paymentRepository.findByStudentCode(code);
	}
	
	@GetMapping(path = "/payments/byStatus")
	public List<Payment> paymentsByStatus(@RequestParam PaymentStatus status){
		return paymentRepository.findByStatus(status);
	}
	
	@GetMapping(path = "/payments/byType")
	public List<Payment> paymentsByType(@RequestParam PaymentType type){
		return paymentRepository.findByType(type);
	}
	
	@GetMapping(path = "/payments/{id}")
	public Payment getPaymentById(@PathVariable Long id){
		return paymentRepository.findById(id).get();
	}
	
	@GetMapping(path = "/students")
	public List<Student> allStudents(){
		return studentRepository.findAll();
	}
	
	@GetMapping(path = "/students/{code}")
	public Student getStudentByCode(@PathVariable String code){
		return studentRepository.findByCode(code);
	}
	
	@GetMapping(path = "/studentsByProgramId")
	public List<Student> getStudentsByProgramId(@RequestParam String programId){
		return studentRepository.findByProgramId(programId);
	}
	
	@PutMapping("payments/{id}")
	public Payment updatePaymentStatus(@RequestParam PaymentStatus status, @PathVariable Long id) {
		return paymentService.updatePaymentStatus(status, id);
	}
	
	@PostMapping(path = "/payments", consumes = MediaType.MULTIPART_FORM_DATA_VALUE) //upload n'importe!
	public Payment savePayment(@RequestParam("file") MultipartFile file, NewPaymentDTO newPaymentDTO) throws IOException{
		return paymentService.savePayment(file, newPaymentDTO);
	}
	
	@GetMapping(path = "payments/{id}/file", produces = MediaType.APPLICATION_PDF_VALUE) //download n'importe!
	public byte[] getPaymentFile(@PathVariable Long id) throws IOException{
		return paymentService.getPaymentFile(id);
	}
	
	

}
