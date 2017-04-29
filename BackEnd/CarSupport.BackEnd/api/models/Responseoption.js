/**
 * Responseoption.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        Id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true,
            required: true
        },
        Description: {
            type: 'string',
            size: 45
        },
        Path: {
            type: 'string',
            size: 80
        },
        OptionType: {
            type: 'string',
            required: true
        },
        Question: {
            model: "Question",
            columnName: "QuestionId"
        }
    }
};