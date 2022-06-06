const mongoose = require("mongoose");

const inspectorSchema = new mongoose.Schema(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        inspectorName: {type: String, required: true, unique: true},
        isAdmin: true,
        onProject: [{type: String}],
        email: String,
        password: String
    },
    {
        hooks: {
          beforeCreate: async (newInspectorData) => {
            newInspectorData.password = await bcrypt.hash(newInspectorData.password, 10);
            return newInspectorData;
          },
          beforeUpdate: async (updatedInspectorData) => {
            updatedInspectorData.password = await bcrypt.hash(
              updatedInspectorData.password,
              10
            );
            return updatedInspectorData;
          },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "inspector",
      }
);

module.exports = mongoose.model("Inspector", inspectorSchema);