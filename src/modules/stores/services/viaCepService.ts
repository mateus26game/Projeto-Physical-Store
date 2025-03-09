import axios from "axios";

// Função ViaCEP
const buscarCEP = async (cep: string) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.data.erro) {
            console.log("CEP não encontrado.");
            return null;
        }
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
        return null;
    }
};

export default buscarCEP;
