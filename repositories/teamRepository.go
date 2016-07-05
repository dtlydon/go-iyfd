package repositories

import "github.com/dtlydon/go-iyfd/models"

type TeamRepository struct{

}

func (this *TeamRepository) GetAll() []models.Team{
	teams := []models.Team {
		{
			Id: "1",
			Name: "Texas A&M",
			Acronym: "TAMU",
		},
		{
			Id: "2",
			Name: "Texas",
			Acronym: "UT",
		},
	}
	return teams
}
