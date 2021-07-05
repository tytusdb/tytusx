class FunctionRepository {


    public static generate(name: TipoFuncion, resultC3D: C3DResult, cP?: number, eP?: number): C3DResult {

        switch(name){
            case TipoFuncion.TO_TAG:            return (new ToTag).generate(resultC3D);
            case TipoFuncion.ANALIZAR:          return (new AnalizarXpath).generate(resultC3D, cP, eP);
            case TipoFuncion.COMPARE:           return (new CompareStrings).generate(resultC3D);
            case TipoFuncion.SIMPLE:            return (new ConsultaSimpleC3D).generate(resultC3D);
            case TipoFuncion.PRINT_R:           return (new PrintResult).generate(resultC3D);
            case TipoFuncion.RECORRER:          return (new RecorrerConsultas).generate(resultC3D);
            case TipoFuncion.PRINT_S:           return (new PrintString).generate(resultC3D);
            case TipoFuncion.PRINT_AT:          return (new PrintAttribs).generate(resultC3D);
            case TipoFuncion.ENNT_HIJOS:        return (new EntornosHijos).generate(resultC3D);
        }
    }
}