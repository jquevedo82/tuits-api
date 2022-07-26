// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Tuit {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  id: string;
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  message: string;

  /*@ApiPropertyOptional({
    type: String,
    description: 'This is an optional property',
  })
  opcional: string;*/
}
