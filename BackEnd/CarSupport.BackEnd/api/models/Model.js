/**
 * Model.js
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
            required:true
        },
        Description:   {
            type: 'string',
            required: true,
            size: 45
        },
        Brand: {
            model: "Brand",
            columnName: "BrandId"
        }
    }
};

