class tbl_turma 
{
    constructor(ID_Turma, Nome, Turno, Semestre, Ano, Status) 
    {
        this.ID_Turma = ID_Turma;
        this.Nome = Nome;
        this.Turno = Turno;
        this.Semestre = Semestre;
        this.Ano = Ano;
        this.ID_Disc = ID_Disc;
        this.Status = Status;
    }
}

export {tbl_turma}