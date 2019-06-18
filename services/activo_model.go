package services

import "time"

type (
	Activo struct {
		ID       int        `json:"-" db:"id"`
		Codigo   int        `json:"_id,omitempty" db:"codigo"`
		Nombre   string     `json:"_nombre,omitempty" db:"nombre"`
		Longitud float64    `json:"_longitud,omitempty" db:"longitud"`
		Diametro float64    `json:"_diametro,omitempty" db:"diametro"`
		Fecha    *time.Time `json:"_fecha" db:"fecha"`
	}

	Activos []Activo
)
