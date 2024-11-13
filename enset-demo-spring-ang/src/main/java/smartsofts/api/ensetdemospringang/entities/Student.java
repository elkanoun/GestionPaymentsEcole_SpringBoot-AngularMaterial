package smartsofts.api.ensetdemospringang.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor @AllArgsConstructor @Getter @Setter @ToString @Builder
public class Student {
	@Id
	private String id;
	
	private String firstName;
	
	private String lastName;
	
	@Column(unique = true)
	private String code;
	
	private String programId;
	
	private String photo;

}
