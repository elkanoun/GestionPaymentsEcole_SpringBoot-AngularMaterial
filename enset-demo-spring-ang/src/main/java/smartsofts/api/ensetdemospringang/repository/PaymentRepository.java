package smartsofts.api.ensetdemospringang.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import smartsofts.api.ensetdemospringang.entities.Payment;
import smartsofts.api.ensetdemospringang.entities.PaymentStatus;
import smartsofts.api.ensetdemospringang.entities.PaymentType;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
	
	List<Payment> findByStudentCode(String code);
	
	List<Payment> findByStatus(PaymentStatus status);
	
	List<Payment> findByType(PaymentType type);

}
