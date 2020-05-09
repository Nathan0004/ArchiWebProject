class Match {
    constructor (id_match, titre, date, heure, adresse, fk_id_coach, AG, BU, AD, MG, MC, MD, DG, DCG, DCD, DD, G)
    {
        this.id_match = id_match;
        this.titre = titre;
        this.date = date;
        this.heure = heure;
        this.adresse = adresse;
        this.fk_id_coach = fk_id_coach;
        this.AG = AG;
        this.BU = BU;
        this.AD = AD;
        this.MG = MG;
        this.MC = MC;
        this.MD = MD;
        this.DG = DG;
        this.DCG = DCG;
        this.DCD = DCD;
        this.DD = DD;
        this.G = G;
        }
}

module.exports = Match; 