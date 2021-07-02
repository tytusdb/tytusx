export var ErroresGlobal = []
var Global = []

export function LimpiarErrores()
{
  ErroresGlobal = []
}

export function CrearGlobal()
{
  Global=[]
}

export function AgregarGlobal(prologo)
{
  Global.push(prologo)
}

export function retonarGlobal()
{
  return Global
}