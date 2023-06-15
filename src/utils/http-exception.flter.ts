import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";

/**
 * このデコレータは、必要なメタデータをExceptionFilterにバインドして、
 * フィルターがHttpException型の例外のみを検知していることをNest.jsに伝えるために宣言されます。
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * @description 例外処理関数
   *
   * @param exception 現在処理中の例外オブジェクト
   * @param host ArgumentsHostオブジェクト -> ハンドラに渡される引数を検索するメソッドを提供します（Expressを使用する場合、Response＆Request＆Nextが提供されます）
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    /**
     * @description HttpExceptionから送信されたデータを抽出する際に使用します。
     */
    const res: any = exception.getResponse();

    // リクエストのURLとエラー情報
    const url: string = request.url;
    const error: string = res.error;
    const timestamp: string = new Date().toLocaleString();

    console.log('リクエストURL:', url);
    console.log('エラー情報:', error);
    console.log('発生時刻:', timestamp);

    /* クライアントに情報を返します。 */
    response.status(status).json({
      success: false,
      message: res.message,
    });
  }
}