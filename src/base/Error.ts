export class MissingPermissionsError extends Error {
    constructor(permission: string, isUser: boolean) {
        if (isUser) super(`You need \`${permission}\` to be able to execute this command!`);
        else if (permission) super(`I need \`${permission}\` to be able to to execute this command!`);
        else super(`I do not have permission to execute this command on the mentioned user!\n**Make sure I have a higher role than the mentioned user**`);
    }
}
