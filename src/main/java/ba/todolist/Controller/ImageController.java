package ba.todolist.Controller;

import ba.todolist.Models.Image;
import ba.todolist.Repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/image")
class ImageController {

    @Autowired
    ImageRepository imageRepository;

    @GetMapping(value = "/download/{imageId}", produces = MediaType.IMAGE_JPEG_VALUE)
    Resource downloadImage(@PathVariable Long imageId) {
        byte[] image = imageRepository.findById(imageId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND))
                .getContent();

        return new ByteArrayResource(image);
    }

    @PostMapping("/upload")
    Long uploadImage(@RequestParam("file") MultipartFile multipartImage) throws Exception {
        Image dbImage = new Image();
        dbImage.setName(multipartImage.getOriginalFilename());
        dbImage.setContent(multipartImage.getBytes());

        return imageRepository.save(dbImage)
                .getId();
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void deleteTodoList(@PathVariable Long id) {
        imageRepository.deleteById(id);
    }

}
