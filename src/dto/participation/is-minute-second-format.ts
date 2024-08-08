import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsMinuteSecondFormat(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isMinuteSecondFormat',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (typeof value !== 'string') return false;
                    const regex = /^\d{1,2}:\d{2}$/;
                    return regex.test(value);
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be in the format MM:SS`;
                }
            },
        });
    };
}
