const Permissao = require('../models/tb_Permissao');

const createPermissao = async (req, res) => {
    try {
        const { ID_Prof, ID_Tipo_Prof } = req.body;
        
        // Verificar se os dados estão vindo no body
        console.log('Dados recebidos:', { ID_Prof, ID_Tipo_Prof});

        // Criar a Permissao no banco de dados
        const permissao= await Permissao.create({ ID_Prof, ID_Tipo_Prof });
        
        // Retorna a permissao criada
        res.status(201).json(permissao);
    } catch (error) {
        // Log do erro para ver os detalhes
        console.error('Erro ao criar permissao:', error);

        res.status(500).json({ error: "Erro ao criar permissao." });
    }
};

const readPermissao = async (req, res) => {
    try {
        // Faz a leitura das permissões no banco de dados
        const permissoes = await Permissao.findAll();
        
        // Retorna as permissões encontrados
        res.send(permissoes);
    } catch (error) {
        console.error("Erro ao buscar permissões: ", error);
        res.status(500).json({ error: "Erro ao buscar permissões." });
    }
};

const deletePermissao = async (req, res) => {
    try {
        const { ID_Permissao } = req.params; // ID da permissao que será excluída

        // Verificar se a permissao existe no banco
        const permissao = await Permissao.findByPk(ID_Permissao);
        if (!permissao) {
            return res.status(404).json({ error: "Permissão não encontrada." });
        }

        {
    
            // Excluir a inscrição
            await permissao.destroy();

            // Retorna uma mensagem de sucesso
            res.json({ message: "Permissao excluída com sucesso!" });

        }


    } catch (error) {
        console.error("Erro ao excluir permissao: ", error);
        res.status(500).json({ error: "Erro ao excluir permissao." });
    }
};

module.exports = {
createPermissao,
readPermissao,
deletePermissao

}