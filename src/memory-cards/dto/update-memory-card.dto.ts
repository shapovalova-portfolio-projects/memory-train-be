import { PartialType } from '@nestjs/mapped-types';
import { CreateMemoryCardDto } from './create-memory-card.dto';

export class UpdateMemoryCardDto extends PartialType(CreateMemoryCardDto) {}
