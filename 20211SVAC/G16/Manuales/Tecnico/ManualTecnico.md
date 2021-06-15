 <div style="text-align:center">

# **Manual técnico TytusX G16**
</div>
 <div style="text-align:center">

 |     Integrantes  |carnet  |
 |-------------|--------|
 |Josselyn Vanessa Polanco Gameros|201602676|
 |Karla Julissa Ajtún Velásquez   |201700565|
 |Diego Leonel Marroquín Martínez |201709014|
</div>

## **Introducción**
 <div style="text-align:justify">
Para el proyecto del curso de Organización y Compiladores 2, se realizó una herramienta que compila, interpreta y traduce el lenguaje de xpath con xml. Este proyecto se desarrollo con lenguaje JavaScript y algunas herramientas que se encuentran bajo la licencia MIT. A continuación se muestran las librerías que se utilizaron.
</div>
<br>

* Departamento de informática
* Departamento de ventas
* Departamento de contabilidad

 <div style="text-align:justify">
 Para realizar la infraestructura de la red, se usaron dos máquinas físicas, cada una de ellas tiene una topología, estás equipos se comunican por medio de una VPN (Red Virtual Privada).
 Al finalizar la infraestructura, se aseguró por medio de un PING entre las máquinas que realmente había comunicación entre ellas.

**Para realizar las topologías se utilizó GNS3, y para la virtualización de las máquinas se usó VMWare.**

 ## Topología 1

  <div style="text-align:justify">
Para realizar la topología 1, se necesitaron los siguientes dispositivos:

1. Cuatro Switch
2. Tres VPCS
3. Tres máquinas virtuales, con SO Linux Lite
4. Cloud

### **_Máquinas vittuales_**

Para poder utilizar una máquina virtual en GNS3 primero hay que hacer algunas configuraciones en nuestro GNS3, para ello vamos a _edit > preferences_ a continuación, aparecerá la siguiente ventana:

![configuración1](imagenes/im1.PNG) 
<div style="text-align: right">

_Imagen No.1_
</div>
Como en este caso usamos VMWare para la creación de máquinas virtuales, daremos clic en "VMWare"


![configuración1](imagenes/im2.PNG) 
<div style="text-align: right">

_Imagen No.2_
</div>
Seleccionamos _configure_ para que se configuren las interfaces. Luego de ello vamos a VMware VMs

![configuración1](imagenes/im3.PNG) 
<div style="text-align: right">

_Imagen No.3_
</div>
En esta sección como se puede ver, ya tenemos las VM que se utilizaron para la práctica.

</div>
<br>

### **Construcción de la topología 1**

La topología 1 se presenta a continuación:

![topologia1](imagenes/topologia1.png)
<div style="text-align: right">

_Topología 1, imagen No.4_
</div>
Para que hubiera comunicación entre esta topología, se configuraron las ip de las VPCs y las máquinas virtuales.
Para las VPCs bastó con abrir la terminal y adignarle la ip, gateway y la máscara de subred.

<br>

**Esta configuración es de la VPC de informática 2**
```
ip 192.168.46.30/24 255.255.255.0
```

De igual manera se configuró el resto de VPCs, en las máquinas virtuales también se configuraron las ip, en este caso, fue con el entorno gráfico de Linux Lite.

![MVInformatica2](imagenes/informatica2.png)
<div style="text-align: right">

_Configuración de ip de la MV informática 2, imagen No.5_
</div>

### **Configuración de la vlan**

Se configuraron las vlan en los switch para que solo usuaarios de un mismo departamento puedan comunicarse y no fuera de este. A continuación, se mostrará como se configuró el switch 2.

![vlanSwitch2](imagenes/vlan.png)
<div style="text-align: right">

_Configuración de la vlan en el switch 2, imagen No.6_
</div>
Como se puede observar en la imagen, en el puerto 0 del switch 2, se configuró la vlan 56, que corresponde al departamento de ventas y su tipo acceso, en el puerto 1, se configuró la vlan 46, que corresponde al departamento de informática.

![vlanSwitch2](imagenes/vlan2.png)
<div style="text-align: right">

_Configuración de la vlan en el switch 2, imagen No.7_
</div>
Debido a que el switch 2 va conectado a otro, se configuró en el puerto 2 la vlan 1, en modo truncal.

### **Configuración de la nube**
Para conectar toda la topología uno a la nube, se configuró lo siguiente:
![nube](imagenes/nubecita.png)
<div style="text-align: right">

_Configuración de la nube, imagen No.8_
</div>
Para que haya comunicación entre las máquinas físicas, se hizo la configuración del puerto local y el remoto, de igual forma la dirección IP de la máquina con la que se quiere tener comunicación.

<br>

1. Puerto local: Se ingresó el puerto remoto de la segunda máquina.
2. Puerto remoto: Se ingresó el puerto local de la segunda máquina.
3. Remote host: se ingresó la ip de la máquina 2 que proporcionó la VPN.

**_configuración de la vlan para la nube_**

![vlannube](imagenes/vlanNubecita.png)
<div style="text-align: right">

_Configuración de la vlan para la nube, imagen No.9_
</div>
En esta caso se conectó con el switch 4 en el puerto 0, por lo que se configuró con modo truncal y la vlan que se ingresó fue la 1.

</div>


