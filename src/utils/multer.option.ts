import { HttpException, HttpStatus } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage, memoryStorage } from 'multer';
import { basename, extname } from 'path';
import * as fileType from 'file-type';

const imageFileFilter = /\/(jpg|jpeg|png|gif)$/;
const audioFileFilter = /\/(m4a|mp3|wav|flac|3gp)$/

export const multerDiskOptions = {
  /**
   * @description 클라이언트로 부터 전송 받은 파일 정보를 필터링 한다
   *
   * @param request Request 객체
   * @param file 파일 정보
   * @param callback 성공 및 실패 콜백함수
   */
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(imageFileFilter)) {
      // 이미지 형식은 jpg, jpeg, png, gif만 허용합니다.
      callback(null, true);
    } else {
      callback(
        new HttpException(
          {
            message: 1,
            error: '지원하지 않는 파일 형식입니다.',
          },
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  /**
   * @description Disk 저장 방식 사용
   *
   * destination 옵션을 설정 하지 않으면 운영체제 시스템 임시 파일을 저정하는 기본 디렉토리를 사용합니다.
   * filename 옵션은 폴더안에 저장되는 파일 이름을 결정합니다. (디렉토리를 생성하지 않으면 에러가 발생!! )
   */
  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath = 'uploads';
      if (!existsSync(uploadPath)) {
        // uploads 폴더가 존재하지 않을시, 생성합니다.
        mkdirSync(uploadPath);
      }
      callback(null, uploadPath);
    },
    filename: (request, file, callback) => {
      //파일 이름 설정
      const ext = extname(file.originalname);
      const base = basename(file.originalname, ext);
      callback(null, `${base}_${Date.now()}${ext}`);
    },
  }),
  limits: {
    fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
    filedSize: 10* 1024 * 1024, // 필드 사이즈 값 설정 (기본값 10MB)
    // fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
    // fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
    // files: 10, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
  },
};

export const multerAudioOptions = {
  /**
   * @description 클라이언트로 부터 전송 받은 파일 정보를 필터링 한다
   *
   * @param request Request 객체
   * @param file 파일 정보
   * @param callback 성공 및 실패 콜백함수
   */
  fileFilter: async (request, file, callback) => {
    const allowedExtensions = ['.m4a', '.mp3', '.wav', '.flac', '.3gp'];
    const fileExt = extname(file.originalname).toLowerCase();

    console.log(file);
    console.log(fileExt);

    if (!allowedExtensions.includes(fileExt)) {
      callback(
        new HttpException(
          '지원하지 않는 파일 형식입니다.',
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
      return;
    }

    const buffer = await file.buffer;
    const fileInfo = await fileType(buffer);

    if (!fileInfo || !allowedExtensions.includes(`.${fileInfo.ext}`)) {
      callback(
        new HttpException(
          '지원하지 않는 파일 형식입니다.',
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
      return;
    }

    callback(null, true);
  },
  /**
   * @description Disk 저장 방식 사용
   *
   * destination 옵션을 설정 하지 않으면 운영체제 시스템 임시 파일을 저정하는 기본 디렉토리를 사용합니다.
   * filename 옵션은 폴더안에 저장되는 파일 이름을 결정합니다. (디렉토리를 생성하지 않으면 에러가 발생!! )
   */
  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath = 'uploads';
      const musicPath = 'uploads/music';
      if (!existsSync(uploadPath)) {
        // uploads 폴더가 존재하지 않을시, 생성합니다.
        mkdirSync(uploadPath);
      }
      if (!existsSync(musicPath)) {
        // music 폴더가 존재하지 않을시, 생성합니다.
        mkdirSync(musicPath);
      }
      callback(null, musicPath);
    },
    filename: (request, file, callback) => {
      //파일 이름 설정
      const ext = extname(file.originalname);
      const base = basename(file.originalname, ext);
      callback(null, `${base}_${Date.now()}${ext}`);
    },
  }),
  limits: {
    fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
    filedSize: 100* 1024 * 1024, // 필드 사이즈 값 설정 (기본값 10MB)
    // fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
    // fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
    // files: 10, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
  },
};

export const multerDiskDestinationOutOptions = {
  /**
   * @description 클라이언트로 부터 전송 받은 파일 정보를 필터링 한다
   *
   * @param request Request 객체
   * @param file 파일 정보
   * @param callback 성공 및 실패 콜백함수
   */
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      // 이미지 형식은 jpg, jpeg, png만 허용합니다.
      callback(null, true);
    } else {
      callback(
        new HttpException(
          {
            message: 1,
            error: '지원하지 않는 이미지 형식입니다.',
          },
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  /**
   * @description Disk 저장 방식 사용
   *
   * destination 옵션을 설정 하지 않으면 운영체제 시스템 임시 파일을 저정하는 기본 디렉토리를 사용합니다.
   * filename 옵션은 폴더안에 저장되는 파일 이름을 결정합니다. (디렉토리를 생성하지 않으면 에러가 발생!! )
   */
  storage: diskStorage({
    filename: (request, file, callback) => {
      //파일 이름 설정
      callback(null, `${Date.now()}${extname(file.originalname)}`);
    },
  }),
  limits: {
    fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
    filedSize: 10* 1024 * 1024, // 필드 사이즈 값 설정 (기본값 10MB)
    fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
    fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
    files: 10, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
  },
};

export const multerMemoryOptions = {
  /**
   * @description 클라이언트로 부터 전송 받은 파일 정보를 필터링 한다
   *
   * @param request Request 객체
   * @param file 파일 정보
   * @param callback 성공 및 실패 콜백함수
   */
  fileFilter: (request, file, callback) => {
    console.log('multerMemoryOptions : fileFilter');
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      // 이미지 형식은 jpg, jpeg, png만 허용합니다.
      callback(null, true);
    } else {
      callback(
        new HttpException(
          {
            message: 1,
            error: '지원하지 않는 이미지 형식입니다.',
          },
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  /**
   * @description Memory 저장 방식 사용
   */
  stroage: memoryStorage(),
  limits: {
    fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
    filedSize: 10* 1024 * 1024, // 필드 사이즈 값 설정 (기본값 10MB)
    fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
    fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
    files: 10, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
  },
};

/**
 * @description 파일 업로드 경로
 * @param file 파일 정보
 *
 * @returns {String} 파일 업로드 경로
 */
export const uploadFileURL = (fileName): string =>
  `http://localhost:3000/${fileName}`;