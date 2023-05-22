const { GraphQLError } = require('graphql');

const errorField = (message, ...fields) => {

    // все поля включены
    const isFields = fields.every(field => field);

    if (!isFields) {
        throw new GraphQLError(message, {
            extensions: {
                code: '400',
                myExtension: "foo",
            },
        });
    }
}

module.exports = {
    errorField,
}
