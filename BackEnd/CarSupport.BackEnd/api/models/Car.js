/**
 * Car.js
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
        LicensePlate:  {
            type: 'string',
            required: true,
            size: 10
        },
        Year:  {
            type: 'string',
            required: true,
            size: 10
        },
        CurrentMileage:  {
            type: 'string',
            required: true,
            size: 45
        },
        FuelType:  {
            type: 'string',
            required: true,
            size: 45
        },
        Class:  {
            type: 'string',
            required: true,
            size: 45
        },
        Model: {
            model: "Model",
            columnName: "ModelId"
        },
        User: {
            model: "User",
            columnName: "UserId"
        }
    }
};

