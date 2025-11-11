import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    NotFoundException,
} from "@nestjs/common";
import { FormatService } from "./format.service";
import { CreateFormatDto } from "./dto/create-format.dto";
import { UpdateFormatDto } from "./dto/update-format.dto";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("format")
export class FormatController {
    constructor(private readonly formatService: FormatService) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard("jwt"))
    @Post("create")
    createFormat(@Body() createFormatDto: CreateFormatDto) {
        return this.formatService.create(createFormatDto);
    }

    @Get("all")
    async getAllFormats() {
        return await this.formatService.findAll();
    }

    @Get("by-name/:name")
    async getFormatById(@Param("name") name: string) {
        const findFormat = await this.formatService.findByName(name);
        if (!findFormat) {
            throw new NotFoundException("Нет такого формата!");
        }
        return findFormat;
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard("jwt"))
    @Patch("update/:id")
    updateFormat(
        @Param("id") id: string,
        @Body() updateFormatDto: UpdateFormatDto,
    ) {
        return this.formatService.update(id, updateFormatDto);
    }
  
    @ApiBearerAuth()
    @UseGuards(AuthGuard("jwt"))
    @Delete(":id")
    deleteFormat(@Param("id") id: string) {
        return this.formatService.remove(id);
    }
}
