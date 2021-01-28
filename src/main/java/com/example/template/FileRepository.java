package com.example.template;

public class FileRepository {
/*
    public static final String BASE_PATH = "/file-repository";

    public static void saveQuestionFile(MultipartFile multipartFile, Question question) throws IOException {
        String fileName = BASE_PATH + "/Question_" + String.valueOf(question.getRef()) + "_" + multipartFile.getOriginalFilename();
        question.setQuestionPath(fileName);

        File targetFile = new File(fileName);
        FileUtils.copyInputStreamToFile(multipartFile.getInputStream(),targetFile);

        //FileOutputStream outputStream = new FileOutputStream(fileName);
        //IOUtils.copy(multipartFile.getInputStream(),outputStream);
        //outputStream.close();
    }

    public static void saveQuestionFile(String name, InputStream is, Question question) throws IOException {
        String fileName = BASE_PATH + "/Question_" + String.valueOf(question.getRef()) + "_" + name;
        question.setQuestionPath(fileName);

        File targetFile = new File(fileName);
        FileUtils.copyInputStreamToFile(is,targetFile);
    }

    public static void saveAnswerFile(MultipartFile multipartFile, Question question) throws IOException {
        String fileName = BASE_PATH + "/Answer_" + String.valueOf(question.getRef()) + "_" + multipartFile.getOriginalFilename();
        question.setAnswerPath(fileName);
        FileOutputStream outputStream = new FileOutputStream(fileName);
        IOUtils.copy(multipartFile.getInputStream(),outputStream);
        outputStream.close();
    }

    public static void saveAnswerFile(String name, InputStream is, Question question) throws IOException {
        String fileName = BASE_PATH + "/Answer_" + String.valueOf(question.getRef()) + "_" + name;
        question.setAnswerPath(fileName);
        FileOutputStream outputStream = new FileOutputStream(fileName);
        IOUtils.copy(is,outputStream);
        outputStream.close();
    }

    public static FileInputStream getQuestionFileStream(Question question) throws FileNotFoundException {
        FileInputStream fileInputStream = new FileInputStream(question.getQuestionPath());
        return fileInputStream;
    }

    public static FileInputStream getAnswerFileStream(Question question) throws FileNotFoundException {
        FileInputStream fileInputStream = new FileInputStream(question.getAnswerPath());
        return fileInputStream;
    }
*/
}
