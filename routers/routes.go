package routers

import (
	c "../controllers"
)

var routes = Routes{
	Route{
		"GET", "/api/activo", false, c.GetActivo,
	},
	Route{
		"GET", "/api/activo/:id", false, c.GetActivo,
	},
	Route{
		"POST", "/api/activo", false, c.PostActivo,
	},
}
