/* Mindstack · Evaluación exploratoria v0.1
 * Declaraciones del prospecto, no diagnósticos ni causas inferidas.
 */
export type Answers = Record<string, string>;
export type Question = {
  id: string; group: string; title: string; help?: string;
  choices: { value: string; label: string }[];
  onlyFor?: "group";
};
export type Finding = {
  id: string; family: string; title: string; evidence: string;
  importance: string; limitation: string; capability: string; priority: number;
};
export type Result = {
  status: "signals" | "uncertain" | "favorable" | "outside_scope";
  title: string; intro: string; findings: Finding[];
  strengths: string[]; unknowns: string[]; invitation: string;
};
export const VERSION = "0.1.0";
export const QUESTIONS: Question[] = [
  { id:"sector", group:"Tu negocio", title:"¿Qué tipo de empresa representas?", choices:[
    {value:"restaurant",label:"Restaurante o negocio de alimentos y bebidas"},
    {value:"group",label:"Grupo restaurantero o varias sucursales"},
    {value:"other",label:"Otro sector"}
  ]},
  { id:"role", group:"Tu negocio", title:"¿Qué función desempeñas?", choices:[
    {value:"owner",label:"Propietario o socio"},
    {value:"director",label:"Dirección o administración"},
    {value:"manager",label:"Gerencia o responsable de área"},
    {value:"other",label:"Otro rol"}
  ]},
  { id:"perception", group:"Tu perspectiva", title:"¿Cómo percibes la situación actual del negocio?", help:"Tu percepción se contrasta con las demás respuestas; no es una calificación.", choices:[
    {value:"good",label:"Considero que todo funciona bien"},
    {value:"mixed",label:"Hay algunos aspectos por mejorar"},
    {value:"difficult",label:"Hay dificultades importantes"},
    {value:"unknown",label:"No tengo suficiente claridad"}
  ]},
  { id:"profit", group:"Rentabilidad", title:"En los últimos tres meses, ¿qué observaste entre ventas y utilidad?", choices:[
    {value:"up",label:"Ambas mejoraron"},
    {value:"stable",label:"Ambas se mantuvieron estables"},
    {value:"gap",label:"Las ventas crecieron, pero la utilidad no aumentó de forma similar"},
    {value:"down",label:"La utilidad disminuyó"},
    {value:"unknown",label:"No puedo compararlas con información suficiente"}
  ]},
  { id:"margins", group:"Rentabilidad", title:"¿Cómo conocen la rentabilidad de cada platillo o producto?", choices:[
    {value:"records",label:"Con registros de ingresos y costos por producto"},
    {value:"general",label:"Revisamos el resultado general, no por producto"},
    {value:"estimate",label:"Por estimaciones o experiencia"},
    {value:"unknown",label:"No lo medimos o desconozco el cálculo"}
  ]},
  { id:"inventory", group:"Operación", title:"En tres meses, ¿con qué frecuencia encontraron diferencias entre el inventario físico y los registros?", choices:[
    {value:"never",label:"No encontramos diferencias al revisarlo"},
    {value:"occasional",label:"Una o dos veces"},
    {value:"frequent",label:"Tres veces o más"},
    {value:"unknown",label:"No lo comprobamos o desconozco el resultado"},
    {value:"na",label:"No aplica"}
  ]},
  { id:"visibility", group:"Control", title:"¿Cuándo revisan indicadores para tomar decisiones operativas?", choices:[
    {value:"regular",label:"Diaria o semanalmente, con indicadores definidos"},
    {value:"monthly",label:"Principalmente al cierre del mes"},
    {value:"reactive",label:"Sólo cuando surge alguna dificultad"},
    {value:"unknown",label:"No hay una revisión definida o la desconozco"}
  ]},
  { id:"branches", group:"Control", title:"¿Se pueden comparar resultados entre sucursales con criterios equivalentes?", onlyFor:"group", choices:[
    {value:"yes",label:"Sí, mismas definiciones y periodos"},
    {value:"partial",label:"Sólo algunos indicadores"},
    {value:"no",label:"Cada sucursal reporta de forma distinta"},
    {value:"unknown",label:"No lo sé"}
  ]},
  { id:"dependency", group:"Procesos", title:"¿Qué sucede si el responsable principal no está disponible?", choices:[
    {value:"autonomous",label:"La operación continúa con responsables y criterios definidos"},
    {value:"sometimes",label:"Algunas decisiones deben esperar"},
    {value:"often",label:"Con frecuencia se detienen actividades importantes"},
    {value:"unknown",label:"No tengo información suficiente"}
  ]},
  { id:"reports", group:"Procesos", title:"¿Cómo funcionan los reportes y tareas administrativas repetitivas?", choices:[
    {value:"controlled",label:"Se realizan de manera consistente, sin dificultades importantes"},
    {value:"manual_ok",label:"Son manuales, pero no representan una dificultad"},
    {value:"rework",label:"Hay recapturas, errores o correcciones frecuentes"},
    {value:"unknown",label:"No conozco suficientemente ese proceso"}
  ]},
  { id:"changes", group:"Aprendizaje", title:"Cuando implementan un cambio, ¿cómo evalúan si funcionó?", choices:[
    {value:"measured",label:"Comparamos indicadores con una meta previa"},
    {value:"informal",label:"Principalmente por percepción o comentarios"},
    {value:"not_measured",label:"Normalmente no evaluamos sus resultados"},
    {value:"unknown",label:"Desconozco el procedimiento"}
  ]},
  { id:"decision", group:"Prioridades", title:"¿Qué decisión te interesa comprender mejor actualmente?", choices:[
    {value:"profit",label:"Costos, precios o rentabilidad"},
    {value:"control",label:"Qué indicadores revisar y cuándo actuar"},
    {value:"process",label:"Cómo reducir fricciones operativas"},
    {value:"growth",label:"Cómo crecer con mayor claridad"},
    {value:"none",label:"No identifico una decisión pendiente"}
  ]}
];
export function visibleQuestions(a: Answers): Question[] {
  if (a.sector === "other") return QUESTIONS.slice(0, 1);
  return QUESTIONS.filter(q => !q.onlyFor || q.onlyFor === a.sector);
}
export function complete(a: Answers): boolean {
  return visibleQuestions(a).every(q => Boolean(a[q.id]));
}
export function getAnswerLabel(id: string, value: string): string {
  return QUESTIONS.find(q => q.id === id)?.choices.find(c => c.value === value)?.label ?? "Sin respuesta";
}
export function evaluate(a: Answers): Result {
  const findings: Finding[] = [];
  const strengths: string[] = [];
  const unknowns: string[] = [];
  const evidence = (id: string) => 'Respuesta del participante: "' + getAnswerLabel(id, a[id]) + '".';
  const add = (id: string, family: string, title: string, question: string, importance: string, limitation: string, capability: string, priority: number) =>
    findings.push({id,family,title,evidence:evidence(question),importance,limitation,capability,priority});
  if (a.sector === "other") return {
    status:"outside_scope", title:"Esta versión está diseñada para restaurantes",
    intro:"No sería responsable aplicar a otra industria reglas específicas de restaurantes. Mindstack trabaja con distintas organizaciones, pero esta evaluación todavía no abarca tu sector.",
    findings, strengths, unknowns, invitation:"Puedes conocer nuestras capacidades y conversar con nosotros si hay una situación que deseas investigar."
  };
  if (!complete(a)) throw new Error("Faltan respuestas aplicables.");
  if (a.profit === "gap" || a.profit === "down")
    add("profit","rentabilidad","Evolución de la utilidad que merece atención","profit","La diferencia entre ventas y utilidad puede influir en decisiones económicas.","La evaluación no identifica causas, magnitud del cambio ni pérdidas comprobadas.","Mindstack puede investigar cómo se relacionan ingresos, costos y resultados antes de proponer acciones.",4);
  else if (a.profit === "up" || a.profit === "stable")
    strengths.push("Reportas una evolución favorable o estable de ventas y utilidad.");
  else unknowns.push("No hay información suficiente para comparar ventas y utilidad.");
  if (a.margins === "records") strengths.push("Declaras utilizar registros para conocer los resultados por producto.");
  if (a.margins === "general" || a.margins === "estimate")
    unknowns.push("La medición descrita podría no ofrecer detalle de rentabilidad por platillo; eso no demuestra que sea incorrecta.");
  if (a.margins === "unknown") unknowns.push("No se conoce cómo se calcula la rentabilidad por producto.");
  if (a.inventory === "frequent")
    add("inventory","proceso","Diferencias recurrentes de inventario declaradas","inventory","Las diferencias entre existencias físicas y registros pueden complicar compras y control.","No se puede concluir que exista robo, desperdicio o error de personal: el origen está por investigar.","Mindstack puede estudiar el flujo de registro, recepción, consumo y control del inventario.",4);
  else if (a.inventory === "never") strengths.push("No reportas diferencias de inventario en las revisiones realizadas.");
  else if (a.inventory === "occasional") unknowns.push("Se reportaron diferencias ocasionales de inventario; no bastan para afirmar recurrencia.");
  else if (a.inventory === "unknown") unknowns.push("No sabemos si los registros coinciden con el inventario físico.");
  if (a.visibility === "reactive")
    add("visibility","control","Seguimiento de información principalmente reactivo","visibility","Revisar datos sólo cuando surge una dificultad puede limitar la capacidad de anticipar decisiones.","No se ha demostrado que falte un tablero ni que existan pérdidas económicas.","Mindstack ayuda a definir información y rutinas de seguimiento vinculadas con decisiones reales.",2);
  else if (a.visibility === "regular") strengths.push("Se declara una revisión frecuente de indicadores operativos.");
  else unknowns.push("El ritmo de seguimiento de indicadores requiere mayor claridad.");
  if (a.branches === "no")
    add("branches","control","Información de sucursales difícil de comparar","branches","Criterios diferentes pueden producir comparaciones inconsistentes.","No se puede concluir que una sucursal funcione peor que otra.","Mindstack puede revisar definiciones, periodos y fuentes antes de comparar el desempeño.",3);
  else if (a.branches === "yes") strengths.push("Declaras criterios equivalentes para comparar sucursales.");
  else if (a.branches === "partial" || a.branches === "unknown") unknowns.push("La comparabilidad de indicadores entre sucursales no está plenamente establecida.");
  if (a.dependency === "often")
    add("dependency","proceso","Dependencia recurrente del responsable principal","dependency","La interrupción habitual de decisiones relevantes puede afectar la continuidad de la operación.","Se desconoce el origen de las interrupciones; no se debe culpar al equipo.","Mindstack puede examinar responsabilidades, autorizaciones y flujos de decisión.",4);
  else if (a.dependency === "autonomous") strengths.push("La operación se declara autónoma ante ausencias del responsable.");
  else if (a.dependency === "sometimes" || a.dependency === "unknown") unknowns.push("Falta delimitar la importancia de algunas dependencias operativas.");
  if (a.reports === "rework")
    add("rework","proceso","Retrabajos administrativos frecuentes","reports","Correcciones y recapturas repetidas podrían consumir tiempo y dificultar el uso de la información.","No conocemos el costo, la causa ni si automatizar sería adecuado.","Mindstack puede investigar el proceso antes de elegir cambios operativos o tecnológicos.",3);
  else if (a.reports === "controlled" || a.reports === "manual_ok") strengths.push("No declaras dificultades relevantes en tareas administrativas repetitivas.");
  else unknowns.push("No se conocen suficientemente los procesos administrativos.");
  if (a.changes === "measured") strengths.push("Declaras comprobar mediante indicadores el efecto de los cambios.");
  else unknowns.push("No quedó establecida una medición sistemática del resultado de los cambios.");
  if (a.perception === "good" && (findings.length || unknowns.length > 1))
    unknowns.unshift("Tu percepción general es positiva, pero también mencionaste señales o datos faltantes. Esto no prueba que existan problemas ocultos.");
  findings.sort((x,y)=>y.priority-x.priority);
  if (findings.length) return {
    status:"signals",title:"Identificamos situaciones que merece la pena comprender",
    intro:"Estas señales proceden de lo que declaraste; no son un diagnóstico ni permiten atribuir causas. Reconocerlas ayuda a precisar qué información podría ser valiosa.",
    findings,strengths,unknowns,
    invitation:"Si alguna de estas situaciones influye en una decisión importante, una conversación con Mindstack puede ayudar a explorar qué convendría investigar."
  };
  if (unknowns.length) return {
    status:"uncertain",title:"No detectamos dificultades claras, pero hay aspectos por aclarar",
    intro:"No tenemos evidencia suficiente para afirmar que exista un problema relevante. Algunas respuestas no permiten conocer con detalle ciertos aspectos del negocio.",
    findings,strengths,unknowns,
    invitation:"No identificamos un servicio concreto que debamos recomendarte. Si tienes una decisión específica en mente, puedes conversar con Mindstack."
  };
  return {
    status:"favorable",title:"Tus respuestas reflejan prácticas de gestión favorables",
    intro:"No identificamos señales relevantes de dificultad en los aspectos consultados. Es un resultado positivo, aunque basado exclusivamente en declaraciones, sin verificación externa y limitado a los temas evaluados.",
    findings,strengths,unknowns,
    invitation:"Con la información disponible no existe una razón suficiente para recomendarte un proyecto. Puedes volver cuando surja una situación que desees comprender mejor."
  };
}
