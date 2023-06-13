import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, validateSync } from 'class-validator';

enum Environment { //列挙型を定義
  Local = "local",
  Dev = "dev",
}

// 環境変数のプロパティとそのバリデーションルールを定義
class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass( // configオブジェクトをEnvironmentVariablesクラスのインスタンスに変換
    EnvironmentVariables,
    config,
    { enableImplicitConversion: true }, // trueにすると、型変換を自動的に行う。
  );
  // validateSync: バリデーションを同期的に実行
  // skipMissingPropertiesをfalseにして、プロパティが存在しない場合でもバリデーションエラーを生成
  const errors = validateSync(validatedConfig, { skipMissingProperties: false  }); 

  if (errors.length > 0) { // もしバリデーションエラーがあれば
    throw new Error(errors.toString()); // エラーメッセージを文字列に変換してエラーをスロー
  }
  return validatedConfig;
}