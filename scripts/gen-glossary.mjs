import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = join(__dirname, '../src/content/glossary');
mkdirSync(BASE, { recursive: true });

const terms = [
  // ── SECCIÓN 1: Fundamentos ───────────────────────────────────────────────
  { id:'la-nube', title:'La Nube (Cloud Computing)', category:'Fundamentos', section:1,
    description:'Entrega de recursos de TI (servidores, almacenamiento, bases de datos, redes, software) bajo demanda vía Internet, con pago por uso.',
    useCase:'Cuando una empresa quiere evitar invertir en hardware físico propio y necesita escalar recursos rápidamente según demanda.',
    awsLink:'https://aws.amazon.com/what-is-cloud-computing/' },

  { id:'region', title:'Región (Region)', category:'Fundamentos', section:1,
    description:'Ubicación geográfica física donde AWS agrupa múltiples centros de datos. Ejemplos: us-east-1 (Virginia), sa-east-1 (São Paulo).',
    useCase:'Elige la Región más cercana a tus usuarios para reducir latencia y cumplir regulaciones locales de datos.',
    awsLink:'https://aws.amazon.com/about-aws/global-infrastructure/regions_az/' },

  { id:'zona-de-disponibilidad', title:'Zona de Disponibilidad (AZ)', acronym:'AZ', category:'Fundamentos', section:1,
    description:'Uno o más centros de datos físicamente separados dentro de una Región, con energía, redes y conectividad independientes.',
    useCase:'Distribuye tus aplicaciones en múltiples AZ para lograr alta disponibilidad y resistencia ante fallos.',
    awsLink:'https://aws.amazon.com/about-aws/global-infrastructure/regions_az/' },

  { id:'pago-por-uso', title:'Pago por uso (Pay-as-you-go)', category:'Fundamentos', section:1,
    description:'Modelo financiero donde solo pagas por los recursos que consumes, sin compromisos a largo plazo ni pagos anticipados.',
    useCase:'Ideal para startups y proyectos con demanda variable: pagas más en picos de tráfico y menos en períodos tranquilos.',
    awsLink:'https://aws.amazon.com/pricing/' },

  { id:'escalabilidad', title:'Escalabilidad', category:'Fundamentos', section:1,
    description:'Capacidad de ajustar recursos (arriba o abajo) según la demanda. Puede ser vertical (más potencia a un servidor) u horizontal (más servidores).',
    useCase:'Auto Scaling de EC2 agrega instancias automáticamente cuando el tráfico sube y las elimina cuando baja.',
    awsLink:'https://aws.amazon.com/autoscaling/' },

  { id:'alta-disponibilidad', title:'Alta Disponibilidad (HA)', acronym:'HA', category:'Fundamentos', section:1,
    description:'Característica de sistemas diseñados para operar continuamente sin interrupciones, minimizando tiempos de inactividad.',
    useCase:'Desplegar aplicaciones en múltiples AZ con balanceadores de carga para garantizar uptime del 99.99%.',
    awsLink:'https://aws.amazon.com/getting-started/hands-on/getting-started-with-aws-high-availability-infrastructure/' },

  { id:'soberania-de-datos', title:'Soberanía de Datos', category:'Fundamentos', section:1,
    description:'Requisitos legales y regulatorios sobre dónde se almacenan físicamente los datos, determinados por la jurisdicción del país.',
    useCase:'Empresas en México o la UE deben asegurarse que sus datos no salgan del país/región por cumplimiento legal.',
    awsLink:'https://aws.amazon.com/compliance/data-privacy/' },

  { id:'latencia', title:'Latencia', category:'Fundamentos', section:1,
    description:'Tiempo de respuesta entre el momento en que se hace una solicitud y cuando se recibe la respuesta. Se mide en milisegundos.',
    useCase:'Elegir una Región de AWS cercana a tus usuarios reduce la latencia de tu aplicación web.',
    awsLink:'https://aws.amazon.com/cloudfront/' },

  { id:'iac', title:'Infraestructura como Código (IaC)', acronym:'IaC', category:'Fundamentos', section:1,
    description:'Práctica de gestionar y provisionar infraestructura de TI mediante archivos de configuración legibles (código), en lugar de procesos manuales.',
    useCase:'Con AWS CloudFormation o CDK defines toda tu infraestructura en código, permitiendo reproducirla y versionarla.',
    awsLink:'https://aws.amazon.com/what-is/iac/' },

  { id:'consola-aws', title:'Consola de Administración AWS', category:'Fundamentos', section:1,
    description:'Interfaz web unificada que permite acceder, gestionar y monitorear todos los servicios de AWS desde el navegador.',
    useCase:'El punto de entrada principal para explorar servicios, configurar recursos y revisar facturación sin escribir código.',
    awsLink:'https://aws.amazon.com/console/' },

  // ── SECCIÓN 2: Comunidad ─────────────────────────────────────────────────
  { id:'aws-user-group', title:'AWS User Group', category:'Comunidad', section:2,
    description:'Comunidades locales independientes de entusiastas y profesionales de AWS que se reúnen para compartir conocimiento técnico.',
    useCase:'Asistir a meetups del grupo local para aprender de experiencias reales, hacer networking y encontrar colaboradores.',
    awsLink:'https://aws.amazon.com/developer/community/usergroups/' },

  { id:'community-builder', title:'AWS Community Builder', category:'Comunidad', section:2,
    description:'Programa oficial de AWS para reconocer entusiastas técnicos que crean contenido (blogs, videos, podcasts) y contribuyen a la comunidad.',
    useCase:'Aplicar al programa para acceder a recursos, créditos AWS, sesiones de formación y visibilidad internacional.',
    awsLink:'https://aws.amazon.com/developer/community/community-builders/' },

  { id:'aws-hero', title:'AWS Hero', category:'Comunidad', section:2,
    description:'El máximo reconocimiento de AWS para expertos externos que han contribuido masivamente a la comunidad global de manera sostenida.',
    useCase:'Referencia de autoridad técnica: seguir a AWS Heroes en redes sociales y blogs para contenido de alto nivel.',
    awsLink:'https://aws.amazon.com/developer/community/heroes/' },

  { id:'aws-academy', title:'AWS Academy', category:'Comunidad', section:2,
    description:'Programa de AWS para instituciones educativas que prepara a estudiantes con currículum alineado a certificaciones AWS.',
    useCase:'Universidades y tecnológicos pueden integrar cursos oficiales de AWS en su plan de estudios de TI.',
    awsLink:'https://aws.amazon.com/training/awsacademy/' },

  { id:'aws-educate', title:'AWS Educate', category:'Comunidad', section:2,
    description:'Recursos y créditos gratuitos de AWS para estudiantes y educadores que quieren aprender computación en la nube.',
    useCase:'Estudiantes sin tarjeta de crédito pueden practicar con servicios reales de AWS mediante créditos educativos.',
    awsLink:'https://aws.amazon.com/education/awseducate/' },

  { id:'ug-leader', title:'User Group Leader', category:'Comunidad', section:2,
    description:'El voluntario que organiza, gestiona y promueve el grupo local de usuarios de AWS, coordinando eventos y comunicaciones.',
    useCase:'Sebastián García es el líder de AWS UG Morelos, organizando meetups y conectando a la comunidad local.',
    awsLink:'https://aws.amazon.com/developer/community/usergroups/' },

  { id:'speaker', title:'Speaker', category:'Comunidad', section:2,
    description:'Miembro de la comunidad que da una presentación técnica, charla o taller en un Meetup o evento de AWS.',
    useCase:'Cualquier miembro con experiencia puede postularse como speaker para compartir aprendizajes del trabajo real.',
    awsLink:'https://aws.amazon.com/developer/community/usergroups/' },

  { id:'meetup', title:'Meetup', category:'Comunidad', section:2,
    description:'Evento periódico (presencial o virtual) organizado por el User Group donde la comunidad se reúne para aprender y hacer networking.',
    useCase:'AWS UG Morelos organiza meetups con charlas técnicas, demos en vivo y espacio para networking local.',
    awsLink:'https://aws.amazon.com/developer/community/usergroups/' },

  { id:'reinforce', title:'AWS re:Inforce', category:'Comunidad', section:2,
    description:'Conferencia anual global de AWS enfocada exclusivamente en seguridad, compliance e identidad en la nube.',
    useCase:'Profesionales de seguridad asisten para conocer las últimas novedades y mejores prácticas de seguridad en AWS.',
    awsLink:'https://reinforce.awsevents.com/' },

  { id:'reinvent', title:'AWS re:Invent', category:'Comunidad', section:2,
    description:'La conferencia anual más grande de AWS celebrada en Las Vegas, con miles de sesiones, lanzamientos y networking global.',
    useCase:'El evento donde AWS anuncia sus innovaciones más importantes del año. Disponible también en streaming gratuito.',
    awsLink:'https://reinvent.awsevents.com/' },

  { id:'aws-summit', title:'AWS Summit', category:'Comunidad', section:2,
    description:'Eventos gratuitos regionales de AWS realizados en grandes ciudades del mundo, con sesiones técnicas y demostraciones.',
    useCase:'Asistir al AWS Summit Ciudad de México es una oportunidad para certificarse, aprender y conectar con el ecosistema.',
    awsLink:'https://aws.amazon.com/events/summits/' },

  { id:'community-day', title:'Community Day', category:'Comunidad', section:2,
    description:'Eventos organizados por la comunidad para la comunidad, sin intervención directa de AWS. 100% voluntarios.',
    useCase:'Los Community Days permiten compartir conocimiento real de uso cotidiano que no siempre aparece en documentación oficial.',
    awsLink:'https://aws.amazon.com/developer/community/usergroups/' },

  { id:'builder', title:'Builder', category:'Comunidad', section:2,
    description:'Término inclusivo usado por AWS para referirse a cualquier persona que construye soluciones, productos o aplicaciones usando AWS.',
    useCase:'No importa si eres estudiante o senior: si construyes algo en AWS, eres un Builder.',
    awsLink:'https://aws.amazon.com/developer/' },

  { id:'developer-advocate', title:'Developer Advocate', category:'Comunidad', section:2,
    description:'Personal de AWS que sirve de puente entre los equipos de ingeniería de AWS y la comunidad de desarrolladores externa.',
    useCase:'Los Developer Advocates crean tutoriales, demos y asisten a eventos para ayudar a la comunidad a adoptar servicios.',
    awsLink:'https://aws.amazon.com/developer/community/' },

  { id:'feedback-loop', title:'Feedback Loop', category:'Comunidad', section:2,
    description:'Proceso continuo de enviar comentarios, sugerencias y reportes de problemas de la comunidad hacia los equipos de producto de AWS.',
    useCase:'Los líderes de User Groups recopilan feedback de sus miembros y lo canalizan a AWS para mejorar servicios.',
    awsLink:'https://aws.amazon.com/developer/community/usergroups/' },

  // ── SECCIÓN 3: Compute & Storage ─────────────────────────────────────────
  { id:'lambda', title:'AWS Lambda', category:'Compute', section:3,
    description:'Servicio de cómputo serverless que ejecuta código en respuesta a eventos sin necesidad de aprovisionar o gestionar servidores.',
    useCase:'Procesar imágenes al subirse a S3, responder a peticiones HTTP via API Gateway, ejecutar tareas programadas.',
    awsLink:'https://aws.amazon.com/lambda/',
    relatedServices:['Amazon S3','API Gateway','Amazon EventBridge'] },

  { id:'s3', title:'Amazon S3', acronym:'Simple Storage Service', category:'Storage', section:3,
    description:'Servicio de almacenamiento de objetos escalable y duradero (99.999999999% de durabilidad) para guardar cualquier tipo de archivo.',
    useCase:'Hosting de sitios web estáticos, backup de datos, almacenamiento de assets (imágenes, videos), data lakes.',
    awsLink:'https://aws.amazon.com/s3/',
    relatedServices:['Amazon CloudFront','AWS Lambda','Amazon Athena'] },

  { id:'ebs', title:'Amazon EBS', acronym:'Elastic Block Store', category:'Storage', section:3,
    description:'Volúmenes de almacenamiento en bloque de alto rendimiento y baja latencia, diseñados para usar con instancias EC2.',
    useCase:'Como disco duro virtual para tus instancias EC2: bases de datos, sistemas de archivos, aplicaciones críticas.',
    awsLink:'https://aws.amazon.com/ebs/',
    relatedServices:['Amazon EC2','Amazon EBS Snapshots'] },

  { id:'lightsail', title:'Amazon Lightsail', category:'Compute', section:3,
    description:'VPS (Servidor Privado Virtual) fácil de usar con precios predecibles, ideal para proyectos pequeños y principiantes.',
    useCase:'Hospedar un blog WordPress, un sitio web pequeño o una app Node.js sin necesidad de configurar EC2 manualmente.',
    awsLink:'https://aws.amazon.com/lightsail/' },

  { id:'fargate', title:'AWS Fargate', category:'Compute', section:3,
    description:'Motor de cómputo serverless para contenedores: corre tus contenedores Docker sin gestionar los servidores subyacentes.',
    useCase:'Ideal cuando quieres contenedores pero sin la carga operativa de administrar un clúster de servidores.',
    awsLink:'https://aws.amazon.com/fargate/',
    relatedServices:['Amazon ECS','Amazon EKS'] },

  { id:'eks', title:'Amazon EKS', acronym:'Elastic Kubernetes Service', category:'Compute', section:3,
    description:'Servicio gestionado de Kubernetes en AWS. Permite orquestar contenedores sin instalar ni operar el plano de control de K8s.',
    useCase:'Empresas con equipos DevOps que ya usan Kubernetes y quieren migrar a la nube con mínimos cambios.',
    awsLink:'https://aws.amazon.com/eks/',
    relatedServices:['AWS Fargate','Amazon ECR','AWS Load Balancer Controller'] },

  { id:'ecs', title:'Amazon ECS', acronym:'Elastic Container Service', category:'Compute', section:3,
    description:'Servicio de orquestación de contenedores propio de AWS, completamente integrado con el ecosistema AWS.',
    useCase:'Correr microservicios en contenedores Docker con integración nativa a IAM, CloudWatch, ALB y más.',
    awsLink:'https://aws.amazon.com/ecs/',
    relatedServices:['AWS Fargate','Amazon ECR','Application Load Balancer'] },

  { id:'aws-batch', title:'AWS Batch', category:'Compute', section:3,
    description:'Servicio para ejecutar trabajos de computación por lotes (batch) a cualquier escala, gestionando automáticamente los recursos.',
    useCase:'Procesamiento de imágenes médicas, renderizado 3D, análisis genómico, simulaciones financieras a gran escala.',
    awsLink:'https://aws.amazon.com/batch/' },

  { id:'s3-glacier', title:'Amazon S3 Glacier', category:'Storage', section:3,
    description:'Almacenamiento de objetos de bajo costo para archivos de largo plazo (archivo/backup), con tiempos de recuperación de minutos a horas.',
    useCase:'Archivar registros contables, backups de bases de datos históricas, cumplimiento normativo de retención de datos.',
    awsLink:'https://aws.amazon.com/s3/storage-classes/glacier/' },

  // ── SECCIÓN 4: Bases de Datos y Analítica ────────────────────────────────
  { id:'rds', title:'Amazon RDS', acronym:'Relational Database Service', category:'Database', section:4,
    description:'Servicio gestionado de bases de datos relacionales (MySQL, PostgreSQL, MariaDB, Oracle, SQL Server) sin gestionar servidores.',
    useCase:'Backend de aplicaciones web que requieren transacciones ACID y consultas SQL complejas.',
    awsLink:'https://aws.amazon.com/rds/',
    relatedServices:['Amazon Aurora','Amazon EC2','AWS Secrets Manager'] },

  { id:'dynamodb', title:'Amazon DynamoDB', category:'Database', section:4,
    description:'Base de datos NoSQL de clave-valor y documentos, completamente gestionada, con latencias de milisegundos a cualquier escala.',
    useCase:'Aplicaciones que necesitan alta velocidad: gaming, IoT, carritos de compra, sesiones de usuario, catálogos.',
    awsLink:'https://aws.amazon.com/dynamodb/',
    relatedServices:['AWS Lambda','Amazon DynamoDB Streams','DAX'] },

  { id:'aurora', title:'Amazon Aurora', category:'Database', section:4,
    description:'Base de datos relacional compatible con MySQL y PostgreSQL, 5x más rápida que MySQL estándar y 3x más que PostgreSQL, con alta disponibilidad integrada.',
    useCase:'Aplicaciones empresariales críticas que requieren alto rendimiento, replicación automática y escalado de lectura.',
    awsLink:'https://aws.amazon.com/rds/aurora/',
    relatedServices:['Amazon RDS','Aurora Serverless','AWS Secrets Manager'] },

  { id:'redshift', title:'Amazon Redshift', category:'Analytics', section:4,
    description:'Servicio de Data Warehouse en la nube para análisis de petabytes de datos estructurados con consultas SQL.',
    useCase:'Consolidar datos de múltiples fuentes para generar reportes de negocio, dashboards y análisis histórico.',
    awsLink:'https://aws.amazon.com/redshift/',
    relatedServices:['AWS Glue','Amazon S3','Amazon QuickSight'] },

  { id:'athena', title:'Amazon Athena', category:'Analytics', section:4,
    description:'Servicio de consultas SQL interactivo y serverless que analiza datos directamente en Amazon S3 sin infraestructura propia.',
    useCase:'Analizar logs de aplicaciones, datos de IoT o cualquier archivo CSV/JSON/Parquet almacenado en S3 sin mover los datos.',
    awsLink:'https://aws.amazon.com/athena/',
    relatedServices:['Amazon S3','AWS Glue','Amazon QuickSight'] },

  { id:'glue', title:'AWS Glue', category:'Analytics', section:4,
    description:'Servicio de integración de datos (ETL) serverless para descubrir, preparar y transformar datos para análisis.',
    useCase:'Extraer datos de RDS, transformarlos y cargarlos en Redshift o S3 para análisis: pipelines ETL sin servidores.',
    awsLink:'https://aws.amazon.com/glue/',
    relatedServices:['Amazon S3','Amazon Redshift','Amazon Athena'] },

  { id:'emr', title:'Amazon EMR', acronym:'Elastic MapReduce', category:'Analytics', section:4,
    description:'Plataforma gestionada de Big Data para procesar grandes volúmenes de datos usando frameworks como Hadoop, Spark y Hive.',
    useCase:'Procesamiento masivo de logs de clickstream, análisis de datos genómicos, entrenamiento de modelos ML a escala.',
    awsLink:'https://aws.amazon.com/emr/' },

  { id:'quicksight', title:'Amazon QuickSight', category:'Analytics', section:4,
    description:'Servicio de Business Intelligence (BI) en la nube para crear visualizaciones interactivas y dashboards con datos de AWS.',
    useCase:'Crear dashboards ejecutivos con datos de Redshift, Athena o S3 sin necesidad de herramientas BI externas.',
    awsLink:'https://aws.amazon.com/quicksight/' },

  { id:'elasticache', title:'Amazon ElastiCache', category:'Database', section:4,
    description:'Servicio de caché en memoria totalmente gestionado compatible con Redis y Memcached para acelerar aplicaciones.',
    useCase:'Almacenar sesiones de usuario, resultados de consultas frecuentes o datos de leaderboards de juegos en memoria.',
    awsLink:'https://aws.amazon.com/elasticache/',
    relatedServices:['Amazon RDS','Amazon DynamoDB','Amazon EC2'] },

  { id:'documentdb', title:'Amazon DocumentDB', category:'Database', section:4,
    description:'Base de datos de documentos gestionada compatible con MongoDB para almacenar, consultar y escalar datos JSON.',
    useCase:'Aplicaciones que usan MongoDB y quieren migrar a la nube sin cambiar su código de aplicación.',
    awsLink:'https://aws.amazon.com/documentdb/' },

  // ── SECCIÓN 5: Seguridad y Redes ─────────────────────────────────────────
  { id:'vpc', title:'Amazon VPC', acronym:'Virtual Private Cloud', category:'Network', section:5,
    description:'Tu red privada virtual aislada dentro de AWS donde puedes lanzar recursos con control total sobre el entorno de red.',
    useCase:'Aislar tus servidores del Internet público, definir subnets, tablas de rutas y controlar el flujo de tráfico.',
    awsLink:'https://aws.amazon.com/vpc/',
    relatedServices:['Security Groups','AWS Direct Connect','Amazon Route 53'] },

  { id:'iam', title:'AWS IAM', acronym:'Identity and Access Management', category:'Security', section:5,
    description:'Servicio para gestionar usuarios, grupos, roles y políticas de permisos de acceso a los servicios y recursos de AWS.',
    useCase:'Crear cuentas para cada desarrollador con solo los permisos que necesitan (principio de mínimo privilegio).',
    awsLink:'https://aws.amazon.com/iam/',
    relatedServices:['AWS Organizations','AWS SSO','AWS CloudTrail'] },

  { id:'security-group', title:'Security Group', category:'Security', section:5,
    description:'Firewall virtual que controla el tráfico de red entrante y saliente de tus instancias EC2 y otros recursos.',
    useCase:'Permitir solo el puerto 443 (HTTPS) desde Internet y el 5432 (PostgreSQL) solo desde tus servidores de app.',
    awsLink:'https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html' },

  { id:'kms', title:'AWS KMS', acronym:'Key Management Service', category:'Security', section:5,
    description:'Servicio para crear, gestionar y auditar claves de cifrado usadas para proteger tus datos en AWS.',
    useCase:'Cifrar datos en S3, EBS y RDS con claves que controlas, con rotación automática y auditoría de uso.',
    awsLink:'https://aws.amazon.com/kms/' },

  { id:'route53', title:'Amazon Route 53', category:'Network', section:5,
    description:'Servicio de DNS (Sistema de Nombres de Dominio) altamente disponible y escalable, con enrutamiento de tráfico inteligente.',
    useCase:'Gestionar el dominio de tu app, hacer failover automático entre regiones y balancear tráfico geográficamente.',
    awsLink:'https://aws.amazon.com/route53/' },

  { id:'shield', title:'AWS Shield', category:'Security', section:5,
    description:'Servicio de protección gestionada contra ataques DDoS (Denegación de Servicio Distribuida) para aplicaciones en AWS.',
    useCase:'Shield Standard protege automáticamente todos los recursos AWS. Shield Advanced añade protección avanzada para apps críticas.',
    awsLink:'https://aws.amazon.com/shield/' },

  { id:'waf', title:'AWS WAF', acronym:'Web Application Firewall', category:'Security', section:5,
    description:'Firewall de aplicaciones web que bloquea tráfico malicioso como inyecciones SQL, XSS y bots antes de que lleguen a tu app.',
    useCase:'Proteger APIs y sitios web contra los ataques OWASP Top 10 con reglas predefinidas o personalizadas.',
    awsLink:'https://aws.amazon.com/waf/' },

  { id:'cloudtrail', title:'AWS CloudTrail', category:'Security', section:5,
    description:'Servicio de auditoría que registra toda actividad de la API y acciones de usuario en tu cuenta AWS para cumplimiento e investigación.',
    useCase:'Saber quién borró un bucket S3, cuándo se modificó una política IAM o desde dónde se accedió a tus recursos.',
    awsLink:'https://aws.amazon.com/cloudtrail/' },

  { id:'cloudwatch', title:'Amazon CloudWatch', category:'Network', section:5,
    description:'Servicio de monitoreo y observabilidad que recopila métricas, logs y eventos de tus recursos y aplicaciones AWS.',
    useCase:'Configurar alarmas cuando el CPU de EC2 supera el 80%, visualizar dashboards y centralizar logs de producción.',
    awsLink:'https://aws.amazon.com/cloudwatch/',
    relatedServices:['AWS Lambda','Amazon SNS','AWS X-Ray'] },

  { id:'secrets-manager', title:'AWS Secrets Manager', category:'Security', section:5,
    description:'Servicio para almacenar, rotar y gestionar de forma segura credenciales, contraseñas, API keys y otros secretos.',
    useCase:'Guardar las credenciales de tu base de datos y rotarlas automáticamente sin actualizar el código de la app.',
    awsLink:'https://aws.amazon.com/secrets-manager/' },

  // ── SECCIÓN 6: IA, Machine Learning ─────────────────────────────────────
  { id:'sagemaker', title:'Amazon SageMaker', category:'AI/ML', section:6,
    description:'Plataforma completa de Machine Learning para construir, entrenar, desplegar y monitorear modelos ML a escala.',
    useCase:'Científicos de datos crean modelos de predicción de churn, recomendación de productos o detección de fraude.',
    awsLink:'https://aws.amazon.com/sagemaker/' },

  { id:'bedrock', title:'Amazon Bedrock', category:'AI/ML', section:6,
    description:'Servicio para construir aplicaciones de Inteligencia Artificial Generativa usando modelos fundacionales de AWS y terceros (Anthropic, Meta, etc.).',
    useCase:'Crear chatbots empresariales, generadores de contenido, asistentes de código y búsqueda semántica sin entrenar modelos desde cero.',
    awsLink:'https://aws.amazon.com/bedrock/' },

  { id:'lex', title:'Amazon Lex', category:'AI/ML', section:6,
    description:'Servicio para crear interfaces conversacionales (chatbots y voicebots) con la misma tecnología de comprensión de lenguaje que Alexa.',
    useCase:'Crear chatbots de atención al cliente, asistentes de reservas o IVR de voz integrados con Contact Center.',
    awsLink:'https://aws.amazon.com/lex/' },

  { id:'rekognition', title:'Amazon Rekognition', category:'AI/ML', section:6,
    description:'Servicio de análisis de imágenes y videos mediante IA: detecta objetos, rostros, texto, actividades y contenido inapropiado.',
    useCase:'Verificación de identidad, moderación de contenido UGC, análisis de videos de seguridad, búsqueda de celebridades.',
    awsLink:'https://aws.amazon.com/rekognition/' },

  { id:'polly', title:'Amazon Polly', category:'AI/ML', section:6,
    description:'Servicio de síntesis de voz (Text-to-Speech) que convierte texto en habla realista en múltiples idiomas y voces.',
    useCase:'Crear audios para e-learning, sistemas de IVR, libros digitales accesibles o asistentes de voz.',
    awsLink:'https://aws.amazon.com/polly/' },

  { id:'llm', title:'Large Language Models (LLM)', acronym:'LLM', category:'AI/ML', section:6,
    description:'Modelos de Inteligencia Artificial entrenados con enormes cantidades de texto, capaces de generar, resumir y razonar con lenguaje natural.',
    useCase:'La base de chatbots como Claude, GPT o Llama. Amazon Bedrock da acceso a múltiples LLMs vía API.',
    awsLink:'https://aws.amazon.com/bedrock/' },

  { id:'machine-learning', title:'Machine Learning (ML)', acronym:'ML', category:'AI/ML', section:6,
    description:'Campo de la IA donde los sistemas aprenden automáticamente de los datos para hacer predicciones o tomar decisiones sin ser programados explícitamente.',
    useCase:'Predicción de demanda, detección de anomalías, sistemas de recomendación, clasificación de imágenes.',
    awsLink:'https://aws.amazon.com/machine-learning/' },

  { id:'deep-learning', title:'Deep Learning', category:'AI/ML', section:6,
    description:'Subcampo del Machine Learning basado en redes neuronales artificiales con múltiples capas (profundas) que aprenden representaciones complejas.',
    useCase:'Reconocimiento de voz, visión por computadora, traducción automática neural y generación de imágenes.',
    awsLink:'https://aws.amazon.com/machine-learning/' },

  { id:'deepracer', title:'AWS DeepRacer', category:'AI/ML', section:6,
    description:'Coche de carreras autónomo a escala 1/18 y plataforma de aprendizaje para entender Reinforcement Learning de forma práctica y divertida.',
    useCase:'Aprender RL entrenando un modelo que conduce un coche virtual en AWS y compitiendo en la liga global de DeepRacer.',
    awsLink:'https://aws.amazon.com/deepracer/' },

  { id:'amazon-q', title:'Amazon Q', category:'AI/ML', section:6,
    description:'Asistente de IA generativa de AWS para el trabajo y los desarrolladores: responde preguntas sobre AWS, genera código y automatiza tareas.',
    useCase:'Consultar documentación AWS en lenguaje natural, generar código para servicios, analizar datos de negocio.',
    awsLink:'https://aws.amazon.com/q/' },

  // ── SECCIÓN 7: DevOps ────────────────────────────────────────────────────
  { id:'cdk', title:'AWS CDK', acronym:'Cloud Development Kit', category:'DevOps', section:7,
    description:'Framework de código abierto para definir infraestructura cloud usando lenguajes de programación familiares (TypeScript, Python, Java, C#).',
    useCase:'Definir toda tu infraestructura como código TypeScript con autocompletado, pruebas unitarias y abstracciones reutilizables.',
    awsLink:'https://aws.amazon.com/cdk/' },

  { id:'cli', title:'AWS CLI', acronym:'Command Line Interface', category:'DevOps', section:7,
    description:'Herramienta de línea de comandos unificada para interactuar con todos los servicios de AWS desde la terminal.',
    useCase:'Automatizar despliegues, gestionar recursos en scripts bash/PowerShell, realizar tareas repetitivas sin la consola web.',
    awsLink:'https://aws.amazon.com/cli/' },

  { id:'sdk', title:'AWS SDK', acronym:'Software Development Kit', category:'DevOps', section:7,
    description:'Bibliotecas oficiales de AWS para integrar servicios cloud en aplicaciones usando lenguajes como Python (boto3), JavaScript, Java y más.',
    useCase:'Subir archivos a S3, leer de DynamoDB o enviar mensajes SQS directamente desde el código de tu aplicación.',
    awsLink:'https://aws.amazon.com/developer/tools/' },

  { id:'codepipeline', title:'AWS CodePipeline', category:'DevOps', section:7,
    description:'Servicio de entrega continua (CI/CD) que automatiza las fases de construcción, pruebas y despliegue de código.',
    useCase:'Cada commit en GitHub dispara automáticamente un pipeline que prueba y despliega la app en producción.',
    awsLink:'https://aws.amazon.com/codepipeline/' },

  { id:'codecommit', title:'AWS CodeCommit', category:'DevOps', section:7,
    description:'Servicio de control de versiones privado y gestionado basado en Git, completamente integrado con el ecosistema AWS.',
    useCase:'Almacenar código fuente de forma segura con integración nativa a CodePipeline, CodeBuild y IAM.',
    awsLink:'https://aws.amazon.com/codecommit/' },

  { id:'amplify', title:'AWS Amplify', category:'DevOps', section:7,
    description:'Conjunto de herramientas y servicios para crear y desplegar aplicaciones web y móviles fullstack rápidamente en AWS.',
    useCase:'Desarrolladores frontend que quieren backend serverless (auth, API, base de datos) sin profundo conocimiento de AWS.',
    awsLink:'https://aws.amazon.com/amplify/' },

  { id:'cloud9', title:'AWS Cloud9', category:'DevOps', section:7,
    description:'Entorno de desarrollo integrado (IDE) basado en la nube que permite escribir, correr y depurar código desde el navegador.',
    useCase:'Entornos de desarrollo preconfigurados para talleres, colaboración en tiempo real y acceso desde cualquier dispositivo.',
    awsLink:'https://aws.amazon.com/cloud9/' },

  { id:'xray', title:'AWS X-Ray', category:'DevOps', section:7,
    description:'Servicio de análisis y depuración para aplicaciones distribuidas: traza solicitudes a través de microservicios para identificar cuellos de botella.',
    useCase:'Entender por qué una petición HTTP tarda 3 segundos rastreando exactamente qué microservicio es el lento.',
    awsLink:'https://aws.amazon.com/xray/',
    relatedServices:['Amazon CloudWatch','AWS Lambda','Amazon ECS'] },

  { id:'microservicios', title:'Microservicios', category:'DevOps', section:7,
    description:'Patrón arquitectónico donde una aplicación se divide en servicios pequeños e independientes, cada uno con su propia responsabilidad y despliegue.',
    useCase:'Netflix, Amazon y Uber usan microservicios para escalar y desplegar partes de su sistema de forma independiente.',
    awsLink:'https://aws.amazon.com/microservices/' },

  { id:'serverless', title:'Serverless', category:'DevOps', section:7,
    description:'Modelo de computación donde no gestionas servidores: el proveedor cloud se encarga de la infraestructura, escalado y disponibilidad.',
    useCase:'AWS Lambda, Fargate y Aurora Serverless permiten enfocarse en el código de negocio sin operar infraestructura.',
    awsLink:'https://aws.amazon.com/serverless/' },

  // ── SECCIÓN 8: Roles y Jerga ─────────────────────────────────────────────
  { id:'senior', title:'Sr (Senior)', category:'Roles', section:8,
    description:'Nivel de seniority que indica alta experiencia técnica, capacidad de liderazgo, toma de decisiones arquitectónicas y mentoría de otros.',
    useCase:'Un Sr Cloud Engineer diseña la arquitectura, establece estándares y guía al equipo en decisiones técnicas complejas.',
    awsLink:'https://aws.amazon.com/certification/' },

  { id:'solution-architect', title:'Solution Architect (SA)', acronym:'SA', category:'Roles', section:8,
    description:'Rol que diseña el "plano arquitectónico" de las soluciones cloud: elige los servicios correctos, garantiza escalabilidad y cumplimiento de requisitos.',
    useCase:'El SA de un proyecto evalúa si usar Lambda o EC2, qué base de datos elegir y cómo garantizar alta disponibilidad.',
    awsLink:'https://aws.amazon.com/certification/certified-solutions-architect-associate/' },

  { id:'devops-engineer', title:'DevOps Engineer', category:'Roles', section:8,
    description:'Profesional que une prácticas de desarrollo (Dev) y operaciones (Ops) para automatizar y acelerar el ciclo de entrega de software.',
    useCase:'Implementa pipelines CI/CD, Infrastructure as Code, monitoreo y prácticas de SRE para entregar software más rápido.',
    awsLink:'https://aws.amazon.com/certification/certified-devops-engineer-professional/' },

  { id:'cloud-practitioner', title:'Cloud Practitioner', category:'Roles', section:8,
    description:'Nivel inicial de conocimiento y certificación AWS: comprende los conceptos fundamentales de la nube sin profundidad técnica.',
    useCase:'La certificación AWS Cloud Practitioner (CLF-C02) es el punto de entrada ideal para comenzar en el mundo AWS.',
    awsLink:'https://aws.amazon.com/certification/certified-cloud-practitioner/' },

  { id:'whitepaper', title:'Whitepaper', category:'Roles', section:8,
    description:'Documentos técnicos oficiales de AWS que describen mejores prácticas, arquitecturas de referencia y guías detalladas por dominio.',
    useCase:'El whitepaper "Security Best Practices" o "Well-Architected Framework" son referencias esenciales para cualquier builder.',
    awsLink:'https://aws.amazon.com/whitepapers/' },

  { id:'well-architected', title:'Well-Architected Framework', category:'Roles', section:8,
    description:'Marco de AWS con 6 pilares (Excelencia Operacional, Seguridad, Fiabilidad, Eficiencia de Rendimiento, Optimización de Costos, Sostenibilidad) para evaluar arquitecturas.',
    useCase:'Usar el AWS Well-Architected Tool para revisar tu arquitectura y recibir recomendaciones de mejora.',
    awsLink:'https://aws.amazon.com/architecture/well-architected/' },

  { id:'best-practices', title:'Best Practices', category:'Roles', section:8,
    description:'Recomendaciones y patrones probados por AWS y la industria para optimizar costos, seguridad, rendimiento y fiabilidad.',
    useCase:'Seguir las best practices de IAM (MFA, roles, mínimo privilegio) desde el inicio evita problemas de seguridad costosos.',
    awsLink:'https://aws.amazon.com/architecture/' },

  { id:'cloud-migration', title:'Cloud Migration', category:'Roles', section:8,
    description:'Proceso de mover datos, aplicaciones y cargas de trabajo desde infraestructura local (on-premises) hacia la nube de AWS.',
    useCase:'La estrategia de las 7R (Rehost, Replatform, Refactor, etc.) guía cómo migrar cada aplicación a AWS.',
    awsLink:'https://aws.amazon.com/cloud-migration/' },

  { id:'hybrid-cloud', title:'Hybrid Cloud', category:'Roles', section:8,
    description:'Arquitectura que combina infraestructura on-premises propia con servicios cloud, conectados de forma integrada.',
    useCase:'Empresas que mantienen datos sensibles en sus propios servidores pero usan AWS para escalar cargas de trabajo.',
    awsLink:'https://aws.amazon.com/hybrid/' },

  { id:'multi-cloud', title:'Multi-cloud', category:'Roles', section:8,
    description:'Estrategia de usar múltiples proveedores de nube (AWS, Azure, GCP) para evitar dependencia de un solo proveedor.',
    useCase:'Una empresa usa AWS para ML, Azure para Office 365 y GCP para BigQuery según las fortalezas de cada uno.',
    awsLink:'https://aws.amazon.com/partners/programs/msp/' },

  // ── SECCIÓN 9: Optimización ──────────────────────────────────────────────
  { id:'tco', title:'TCO (Total Cost of Ownership)', acronym:'TCO', category:'Optimización', section:9,
    description:'El costo total de adquirir, operar y mantener una solución tecnológica durante su vida útil, comparando on-premises vs cloud.',
    useCase:'La calculadora TCO de AWS demuestra cuánto ahorra una empresa al migrar 50 servidores físicos a EC2.',
    awsLink:'https://aws.amazon.com/tco-calculator/' },

  { id:'cost-explorer', title:'Cost Explorer', category:'Optimización', section:9,
    description:'Herramienta visual de AWS para analizar y entender tus gastos, identificar tendencias y detectar costos inesperados.',
    useCase:'Revisar qué servicio generó el 60% del gasto del mes, identificar recursos olvidados y proyectar costos futuros.',
    awsLink:'https://aws.amazon.com/aws-cost-management/aws-cost-explorer/' },

  { id:'reserved-instances', title:'Reserved Instances', category:'Optimización', section:9,
    description:'Descuento de hasta 72% en EC2 a cambio de comprometerse a usar un tipo de instancia por 1 o 3 años.',
    useCase:'Para cargas de trabajo estables y predecibles (servidores de producción siempre activos) son muy convenientes.',
    awsLink:'https://aws.amazon.com/ec2/pricing/reserved-instances/' },

  { id:'spot-instances', title:'Spot Instances', category:'Optimización', section:9,
    description:'Capacidad de cómputo sobrante de AWS disponible con descuentos de hasta 90% a cambio de tolerar interrupciones.',
    useCase:'Procesamiento batch, análisis de datos, CI/CD y Machine Learning donde las interrupciones son tolerables.',
    awsLink:'https://aws.amazon.com/ec2/spot/' },

  { id:'aws-budgets', title:'AWS Budgets', category:'Optimización', section:9,
    description:'Servicio para definir presupuestos personalizados y recibir alertas cuando el gasto real o proyectado supera los umbrales.',
    useCase:'Configurar alerta cuando el gasto mensual supere $50 USD para evitar sorpresas en la factura.',
    awsLink:'https://aws.amazon.com/aws-cost-management/aws-budgets/' },

  { id:'free-tier', title:'AWS Free Tier', category:'Optimización', section:9,
    description:'Capa gratuita de AWS que permite experimentar con más de 100 servicios sin costo durante 12 meses o de forma permanente.',
    useCase:'Ideal para aprender: EC2 t2.micro, 5GB S3, 1M invocaciones Lambda/mes y más, gratis por 12 meses.',
    awsLink:'https://aws.amazon.com/free/' },

  { id:'marketplace', title:'AWS Marketplace', category:'Optimización', section:9,
    description:'Tienda digital curada con miles de soluciones de software de terceros listas para desplegar en AWS con precios consolidados.',
    useCase:'Comprar y desplegar en minutos soluciones como Splunk, MongoDB Atlas o WordPress preconfigurado en tu cuenta AWS.',
    awsLink:'https://aws.amazon.com/marketplace' },

  { id:'ccoe', title:'Cloud Center of Excellence (CCoE)', acronym:'CCoE', category:'Optimización', section:9,
    description:'Equipo interno multidisciplinario que lidera, guía y acelera la adopción de la nube en una organización, estableciendo estándares.',
    useCase:'El CCoE define qué servicios AWS usar, cómo estructurar cuentas, políticas de seguridad y procesos de gobernanza.',
    awsLink:'https://aws.amazon.com/executive-insights/content/establishing-a-cloud-center-of-excellence/' },

  { id:'governance', title:'Governance', category:'Optimización', section:9,
    description:'Conjunto de reglas, políticas y procesos para controlar, auditar y gestionar el uso de recursos cloud de forma ordenada.',
    useCase:'AWS Organizations + Service Control Policies permiten que la empresa controle qué pueden hacer todas sus cuentas AWS.',
    awsLink:'https://aws.amazon.com/organizations/' },

  { id:'compliance', title:'Compliance', category:'Optimización', section:9,
    description:'Cumplimiento de normativas y estándares regulatorios (ISO 27001, SOC 2, PCI DSS, GDPR) en el uso de servicios cloud.',
    useCase:'AWS cumple con más de 143 estándares de seguridad. Verificar la conformidad de tu arquitectura con AWS Artifact.',
    awsLink:'https://aws.amazon.com/compliance/' },

  // ── SECCIÓN 10: Pro Tips ─────────────────────────────────────────────────
  { id:'cold-start', title:'Cold Start', category:'Pro Tips', section:10,
    description:'El retraso inicial que ocurre cuando una función Lambda se invoca tras un período de inactividad y necesita inicializar su entorno de ejecución.',
    useCase:'Para apps sensibles a la latencia se usan Provisioned Concurrency o Lambda SnapStart para eliminar el cold start.',
    awsLink:'https://aws.amazon.com/blogs/compute/operating-lambda-performance-optimization-part-1/' },

  { id:'s3-bucket', title:'S3 Bucket', category:'Pro Tips', section:10,
    description:'El contenedor fundamental de Amazon S3: un repositorio donde almacenas objetos (archivos). Los nombres son globalmente únicos en todo AWS.',
    useCase:'Los buckets pueden albergar desde un archivo hasta petabytes. Se configuran con políticas de acceso, versionado y cifrado.',
    awsLink:'https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-buckets-s3.html' },

  { id:'iam-role', title:'IAM Role', category:'Pro Tips', section:10,
    description:'Identidad de AWS que puede ser asumida temporalmente por servicios, aplicaciones o usuarios para obtener permisos específicos sin credenciales permanentes.',
    useCase:'Una función Lambda asume un Role para leer de DynamoDB. Una EC2 asume un Role para escribir en S3. Sin claves hardcodeadas.',
    awsLink:'https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html' },

  { id:'cloud-native', title:'Cloud Native', category:'Pro Tips', section:10,
    description:'Aplicaciones diseñadas y construidas específicamente para aprovechar las ventajas de la nube: escalabilidad, resiliencia y servicios gestionados.',
    useCase:'Una app cloud native usa Lambda, DynamoDB y S3 en lugar de copiar la arquitectura de un servidor físico.',
    awsLink:'https://aws.amazon.com/what-is/cloud-native/' },

  { id:'everything-store', title:'The Everything Store', category:'Pro Tips', section:10,
    description:'El origen de Amazon como tienda online que quería vender "todo". AWS nació cuando Amazon virtualizó su infraestructura interna y la ofreció al mundo en 2006.',
    useCase:'Recordatorio de que las mejores plataformas tecnológicas nacen de necesidades reales internas: AWS resolvió primero el problema de Amazon.',
    awsLink:'https://aws.amazon.com/about-aws/' },
];

let created = 0;
let skipped = 0;

for (const t of terms) {
  const file = join(BASE, `${t.id}.mdx`);
  const related = t.relatedServices ? `\nrelatedServices: [${t.relatedServices.map(s => `"${s}"`).join(', ')}]` : '\nrelatedServices: []';
  const acronym = t.acronym ? `\nacronym: "${t.acronym}"` : '';
  const awsLink = t.awsLink ? `\nawsLink: "${t.awsLink}"` : '';
  const section = t.section ? `\nsection: ${t.section}` : '';

  const content = `---
title: "${t.title}"${acronym}
category: "${t.category}"${section}
description: "${t.description.replace(/"/g, "'")}"
useCase: "${t.useCase.replace(/"/g, "'")}"${awsLink}${related}
---
`;

  try {
    const { existsSync } = await import('fs');
    if (!existsSync(file)) {
      writeFileSync(file, content, 'utf8');
      created++;
      console.log(`✓ ${t.id}.mdx`);
    } else {
      // overwrite ec2 with updated data
      writeFileSync(file, content, 'utf8');
      skipped++;
      console.log(`↺ ${t.id}.mdx (updated)`);
    }
  } catch(e) {
    console.error(`✗ ${t.id}.mdx`, e.message);
  }
}

console.log(`\nDone: ${created} created, ${skipped} updated. Total: ${terms.length} terms.`);
