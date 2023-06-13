import { HttpException, HttpStatus } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage, memoryStorage } from 'multer';
import { basename, extname } from 'path';

// 受け入れる画像ファイル形式を変数に格納
const imageFileFilter = /\/(jpg|jpeg|png|gif)$/;

export const multerDiskOptions = {
  /**
   * @author ckcic
   * @description クライアントからアップロードされたファイル(画像ファイル)情報をフィルタリングします。
   *
   * @param request Express Requestオブジェクト
   * @param file  ファイルの情報を含むオブジェクト
   * @param callback フィルターを通過した時と失敗した時のコールバック関数
   */
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(imageFileFilter)) { // フィルターを通過した時
      callback(null, true);
    } else { // 失敗した時
      callback(
        new HttpException(
          {
            message: '画像ファイル形式 エラー',
            error: '対応していないファイル形式です。',
          },
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  /**
   * @author ckcic
   * @description diskStorageを使用
   */
  storage: diskStorage({
    /**
     * @author ckcic
     * @description destinationオプションを設定しないと、オペレーティングシステム(OS)のシステム一時ファイルを保存するデフォルトのディレクトリを使います。
     * 
     * @param req Express Requestオブジェクト
     * @param file ファイルの情報を含むオブジェクト
     * @param callback 送信先パスを決定するためのコールバック
     */
    destination: (request, file, callback) => {
      const uploadPath = 'uploads';
      if (!existsSync(uploadPath)) { // uploadsフォルダが存在しない場合、生成します。
        mkdirSync(uploadPath);
      }
      callback(null, uploadPath);
    },
    /**
     * @author ckcic
     * @description filenameオプションはフォルダ内に保存されるファイル名を決定します。 (ディレクトリが存在しないとエラーが発生する!!)
     * 
     * @param req Express Requestオブジェクト
     * @param file ファイルの情報を含むオブジェクト
     * @param callback アップロードされたファイルの名前を決定するためのコールバック
     */
    filename: (request, file, callback) => {
      const ext = extname(file.originalname);
      const base = basename(file.originalname, ext);
      callback(null, `${base}_${Date.now()}${ext}`);
    },
  }),
  limits: {
    fieldNameSize: 200, // フィールド名サイズの最大値 (デフォルト 100bytes)
    filedSize: 10* 1024 * 1024, // フィールドサイズの値設定 (デフォルト10MB)
    // fields: 2, // ファイル形式以外のフィールドの最大数 (デフォルト無制限)
    // fileSize: 16777216, //multipart形式のフォームの最大ファイルサイズ(bytes) (デフォルト無制限)
    // files: 10, //multipart 形式フォームのファイルフィールドの最大数 (デフォルト無制限)
  },
};

export const multerAudioOptions = {
  /**
   * @author ckcic
   * @description クライアントからアップロードされたファイル(音声ファイル)情報をフィルタリングします。
   *
   * @param request Express Requestオブジェクト
   * @param file  ファイルの情報を含むオブジェクト
   * @param callback フィルターを通過した時と失敗した時のコールバック関数
   */
  fileFilter: async (request, file, callback) => {
    // 受け入れる音声ファイル形式を配列に格納
    const allowedExtensions = ['.m4a', '.mp3', '.wav', '.flac', '.3gp'];
    const fileExt = extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(fileExt)) { // 配列にいない場合
      callback(
        new HttpException(
          {
            message: '音声ファイル形式 エラー',
            error: '対応していないファイル形式です。',
          },
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
      return;
    }

    callback(null, true);
  },
   /**
   * @author ckcic
   * @description diskStorageを使用
   */
  storage: diskStorage({
    /**
     * @author ckcic
     * @description destinationオプションを設定しないと、オペレーティングシステム(OS)のシステム一時ファイルを保存するデフォルトのディレクトリを使います。
     * 
     * @param req Express Requestオブジェクト
     * @param file ファイルの情報を含むオブジェクト
     * @param callback 送信先パスを決定するためのコールバック
     */
    destination: (request, file, callback) => {
      const uploadPath = 'uploads';
      const musicPath = 'uploads/music';
      if (!existsSync(uploadPath)) { // uploadsフォルダが存在しない場合、生成します。
        mkdirSync(uploadPath);
      }
      if (!existsSync(musicPath)) { // musicフォルダが存在しない場合、生成します。
        mkdirSync(musicPath);
      }
      callback(null, musicPath);
    },
    /**
     * @author ckcic
     * @description filenameオプションはフォルダ内に保存されるファイル名を決定します。 (ディレクトリが存在しないとエラーが発生する!!)
     * 
     * @param req Express Requestオブジェクト
     * @param file ファイルの情報を含むオブジェクト
     * @param callback アップロードされたファイルの名前を決定するためのコールバック
     */
    filename: (request, file, callback) => {
      const ext = extname(file.originalname);
      const base = basename(file.originalname, ext);
      callback(null, `${base}_${Date.now()}${ext}`);
    },
  }),
  limits: {
    fieldNameSize: 200, // フィールド名サイズの最大値 (デフォルト 100bytes)
    filedSize: 100* 1024 * 1024, // フィールドサイズの値設定 (デフォルト10MB)
    // fields: 2, // ファイル形式以外のフィールドの最大数 (デフォルト無制限)
    // fileSize: 16777216, //multipart形式のフォームの最大ファイルサイズ(bytes) (デフォルト無制限)
    // files: 10, //multipart 形式フォームのファイルフィールドの最大数 デフォルト無制限)
  },
};

export const multerClothesOptions = {
    /**
     * @author ckcic
     * @description クライアントからアップロードされたファイル(画像ファイル)情報をフィルタリングします。
     *
     * @param request Express Requestオブジェクト
     * @param file  ファイルの情報を含むオブジェクト
     * @param callback フィルターを通過した時と失敗した時のコールバック関数
     */
    fileFilter: (request, file, callback) => {
      if (file.mimetype.match(imageFileFilter)) {
        callback(null, true);
      } else {
        callback(
          new HttpException(
            {
              message: '商品の衣装ファイル形式 エラー',
              error: '対応していないファイル形式です。',
            },
            HttpStatus.BAD_REQUEST,
          ),
          false,
        );
      }
    },
    storage: diskStorage({
      /**
       * @author ckcic
       * @description destinationオプションを設定しないと、オペレーティングシステム(OS)のシステム一時ファイルを保存するデフォルトのディレクトリを使います。
       * 
       * @param req Express Requestオブジェクト
       * @param file ファイルの情報を含むオブジェクト
       * @param callback 送信先パスを決定するためのコールバック
       */
      destination: (request, file, callback) => {
        const uploadPath = 'uploads';
        const clothesPath = 'uploads/clothes';
        if (!existsSync(uploadPath)) { // uploadsフォルダが存在しない場合、生成します。
          mkdirSync(uploadPath);
        }
        if (!existsSync(clothesPath)) { // clothフォルダが存在しない場合、生成します。
          mkdirSync(clothesPath);
        }
        callback(null, clothesPath);
      },
      /**
       * @author ckcic
       * @description filenameオプションはフォルダ内に保存されるファイル名を決定します。 (ディレクトリが存在しないとエラーが発生する!!)
       * 
       * @param req Express Requestオブジェクト
       * @param file ファイルの情報を含むオブジェクト
       * @param callback アップロードされたファイルの名前を決定するためのコールバック
       */
      filename: (request, file, callback) => {
        const ext = extname(file.originalname);
        const base = basename(file.originalname, ext);
        callback(null, `${base}_${Date.now()}${ext}`);
      },
    }),
    limits: {
      fieldNameSize: 200, // フィールド名サイズの最大値 (デフォルト 100bytes)
      filedSize: 10* 1024 * 1024, // フィールドサイズの値設定(デフォルト10MB)
    },
  };

export const multerModelsOptions = {
  /**
   * @author ckcic
   * @description クライアントからアップロードされたファイル(3Dモデルのファイル)情報をフィルタリングします。
   *
   * @param request Express Requestオブジェクト
   * @param file  ファイルの情報を含むオブジェクト
   * @param callback フィルターを通過した時と失敗した時のコールバック関数
   */
  fileFilter: (request, file, callback) => {
    // 受け入れる3Dモデルのファイル形式を配列に格納
    const allowedExtensions = ['.gltf', '.glb'];
    const fileExt = extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(fileExt)) { // 配列にいない場合
      callback(
        new HttpException(
          {
            message: '3Dモデルのファイル形式 エラー',
            error: '対応していないファイル形式です。',
          },
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
      return;
    }

    callback(null, true);
  },
  storage: diskStorage({
    /**
     * @author ckcic
     * @description destinationオプションを設定しないと、オペレーティングシステム(OS)のシステム一時ファイルを保存するデフォルトのディレクトリを使います。
     * 
     * @param req Express Requestオブジェクト
     * @param file ファイルの情報を含むオブジェクト
     * @param callback 送信先パスを決定するためのコールバック
     */
    destination: (request, file, callback) => {
      const uploadPath = 'uploads';
      const modelsPath = 'uploads/models';
      if (!existsSync(uploadPath)) { // uploadsフォルダが存在しない場合、生成します。
        mkdirSync(uploadPath);
      }
      if (!existsSync(modelsPath)) { // modelsフォルダが存在しない場合、生成します。
        mkdirSync(modelsPath);
      }
      callback(null, modelsPath);
    },
    /**
     * @author ckcic
     * @description filenameオプションはフォルダ内に保存されるファイル名を決定します。 (ディレクトリが存在しないとエラーが発生する!!)
     * 
     * @param req Express Requestオブジェクト
     * @param file ファイルの情報を含むオブジェクト
     * @param callback アップロードされたファイルの名前を決定するためのコールバック
     */
    filename: (request, file, callback) => {
      const ext = extname(file.originalname);
      const base = basename(file.originalname, ext);
      callback(null, `${base}_${Date.now()}${ext}`);
    },
  }),
  limits: {
    fieldNameSize: 200, // フィールド名サイズの最大値 (デフォルト 100bytes)
    filedSize: 10* 1024 * 1024, // フィールドサイズの値設定(デフォルト10MB)
  },
};


export const multerMemoryOptions = { // memoryStorageを使う場合
  /**
   * @author ckcic
   * @description クライアントからアップロードされたファイル(画像ファイル)情報をフィルタリングします。
   *
   * @param request Express Requestオブジェクト
   * @param file  ファイルの情報を含むオブジェクト
   * @param callback フィルターを通過した時と失敗した時のコールバック関数
   */
  fileFilter: (request, file, callback) => {
    console.log('multerMemoryOptions : fileFilter');
    if (file.mimetype.match(imageFileFilter)) {
      callback(null, true);
    } else {
      callback(
        new HttpException(
          {
            message: 'ファイル形式 エラー',
            error: '対応していないファイル形式です。',
          },
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  /**
   * @author ckcic
   * @description memoryStorageを使用
   */
  stroage: memoryStorage(),
  limits: {
    fieldNameSize: 200, // フィールド名サイズの最大値 (デフォルト 100bytes)
    filedSize: 10* 1024 * 1024, // フィールドサイズの値設定(デフォルト10MB)
    fields: 2, // ファイル形式以外のフィールドの最大数 (デフォルト無制限)
    fileSize: 16777216, //multipart形式のフォームの最大ファイルサイズ(bytes) "16MB設定" (デフォルト無制限)
    files: 10, //multipart 形式フォームのファイルフィールドの最大数(デフォルト無制限)
  },
};


/**
 * @author ckcic
 * @description ファイルアップロードパス
 * @param file ファイルの情報
 *
 * @returns {String} ファイルアップロードパス
 */
export const uploadFileURL = (fileName): string =>
  `http://localhost:3000/${fileName}`;