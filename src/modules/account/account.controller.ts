import {Controller, Get, Body, Patch} from '@nestjs/common';
import {AccountService} from './account.service';
import {UpdateAccountDto} from './dto/update-account.dto';
import {ApiTags, ApiOperation, ApiResponse, ApiBody} from '@nestjs/swagger';

@ApiTags('Account')
@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {
    }

    @ApiOperation({
        summary: 'Get current user account details',
        description: 'Retrieves the account information of the currently authenticated user'
    })
    @ApiResponse({
        status: 200,
        description: 'Account details retrieved successfully',
        schema: {
            example: {
                id: '123e4567-e89b-12d3-a456-426614174000',
                email: 'john.doe@example.com',
                username: 'john_doe',
                firstName: 'John',
                lastName: 'Doe',
                createdAt: '2025-07-28T12:00:00Z'
            }
        }
    })
    @Get()
    findOwn() {
        return this.accountService.findOwn();
    }

    @ApiOperation({
        summary: 'Update current user account details',
        description: 'Updates the account information of the currently authenticated user'
    })
    @ApiBody({
        type: UpdateAccountDto,
        description: 'Account update payload',
        examples: {
            example1: {
                summary: 'Basic update',
                value: {
                    email: 'new.email@example.com',
                    username: 'new_username',
                    firstName: 'Jane',
                    lastName: 'Smith'
                }
            }
        }
    })
    @ApiResponse({
        status: 200,
        description: 'Account updated successfully',
        schema: {
            example: {
                id: '123e4567-e89b-12d3-a456-426614174000',
                email: 'new.email@example.com',
                username: 'new_username',
                firstName: 'Jane',
                lastName: 'Smith',
                updatedAt: '2025-07-28T12:00:00Z'
            }
        }
    })
    @ApiResponse({status: 400, description: 'Invalid input data'})
    @Patch()
    update(@Body() updateAccountDto: UpdateAccountDto) {
        return this.accountService.update(updateAccountDto);
    }
}
