import { model, Schema } from "mongoose";

// Definindo o esquema da loja com os campos em português
const storeSchema = new Schema(
    {
        nome_da_loja: { type: String, required: true }, // Nome da loja
        endereco: {
            rua: { type: String, required: true }, // Rua da loja
            bairro: { type: String, required: true }, // Bairro da loja
            cidade: { type: String, required: true }, // Cidade da loja
            estado: { type: String, required: true }, // Estado da loja
            cep: { type: String, required: true }, // CEP da loja
        },
        descricao: { type: String, required: true }, // Descrição da loja
        coordenadas: {
            latitude: { type: Number, required: true }, // Latitude da loja
            longitude: { type: Number, required: true }, // Longitude da loja
        },
    },
    {
        timestamps: true, // Cria os campos createdAt e updatedAt automaticamente
    }
);

// Exporta o modelo da loja com base no esquema criado
export const StoreModel = model("Store", storeSchema);
