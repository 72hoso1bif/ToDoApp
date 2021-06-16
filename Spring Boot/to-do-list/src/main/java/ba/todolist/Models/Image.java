package ba.todolist.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Arrays;
import java.util.Objects;

@Entity
@Table(name = "images")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Image {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @Lob
    byte[] content;

    @NotBlank
    @Size(max = 30)
    String name;


    @Override
    public String toString() {
        return "Image{" +
                "id=" + id +
                ", content=" + Arrays.toString(content) +
                ", name='" + name + '\'' +
                '}';
    }
}
