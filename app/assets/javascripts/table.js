
function addTableGeoMap(map, data) {

  // Pegue as chaves do primeiro objeto para os cabeçalhos da tabela
  var headers = data.length > 0 ? Object.keys(data[0]) : [];

  // Adicione os cabeçalhos à tabela, incluindo o cabeçalho de ações
  $('#tableHeaders').empty();  // Limpe os cabeçalhos antigos
  $.each(headers, function (index, header) {

    header = header.replaceAll('_', ' ');
    console.log(header)
    if (header != 'geomJson') {
      $('#tableHeaders').append('<th>' + header + '</th>');
    } else {
      $('#tableHeaders').append('<th class="is-hidden">' + header + '</th>');

    }

  });
  $('#tableHeaders').append('<th>Ações</th>');  // Adiciona o cabeçalho para ações

  // Inicialize ou recupere a DataTable
  var table = $('#gridContainer').DataTable({
   
    destroy: true,  // Permite reinicializar a tabela
    data: data.length > 0 ? data.map(item => headers.map(header => item[header])) : [],
    columns: headers.map(header => ({ title: header.replaceAll('_', ' ') })).concat({
      title: 'Ações',
      orderable: false, // Não permita a ordenação nesta coluna
      render: function (data, type, row, meta) {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye ver-btn" viewBox="0 0 16 16">
        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
      </svg>`
      }
    })
  });
  // Limpe a tabela antes de preenchê-la
  table.clear().draw();

  // Adicione os dados à tabela
  if (data.length > 0) {
    $.each(data, function (index, value) {
      var rowData = [];
      $.each(headers, function (index, header) {
        rowData.push(value[header]);
      });
      console.log(rowData)
      table.row.add(rowData).draw();
    });
  }

  // Eventos para os botões de ação
  $('#gridContainer').on('click', '.ver-btn', function () {
    var geoJSON = table.row($(this).parents('tr')).data()[1]; // Supondo que o GeoJSON esteja na primeira coluna
    // Zoom no mapa usando o GeoJSON
    console.log(geoJSON)
    zoomToGeoJSON(map, geoJSON);
  });

}
function zoomToGeoJSON(map, geoJSON) {
  // Verifique se o GeoJSON é válido  
  if (geoJSON) {
    console.log('GeoJSON recebido:', geoJSON);
    
    // Faça o zoom no mapa usando o GeoJSON
    var vectorSource = new ol.source.Vector({
      features: (new ol.format.GeoJSON()).readFeatures(geoJSON)
    });

    console.log('Features lidas:', vectorSource.getFeatures());

    // Defina estilos para diferentes tipos de geometrias
    var styleFunction = function (feature) {
      var geometryType = feature.getGeometry().getType();
      console.log('Tipo de geometria:', geometryType);
      switch (geometryType) {
        case 'Point':
          return new ol.style.Style({
            image: new ol.style.Circle({
              radius: 5,
              fill: new ol.style.Fill({
                color: 'red' // Cor dos pontos
              }),
              stroke: new ol.style.Stroke({
                color: 'black',
                width: 1
              })
            })
          });
        case 'LineString':
          return new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: 'blue', // Cor das linhas
              width: 2
            })
          });
        case 'Polygon':
          return new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(255, 255, 0, 0.3)' // Polígonos transparentes com cor amarela
            }),
            stroke: new ol.style.Stroke({
              color: 'yellow', // Contorno amarelo
              width: 2
            })
          });
        default:
          console.warn('Geometria não especificada, aplicando estilo padrão.');
          return new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: 'black',
              width: 1
            }),
            fill: new ol.style.Fill({
              color: 'rgba(0, 0, 0, 0.1)' // Cor padrão para geometrias não especificadas
            })
          });
      }
    };

    // Atribua o estilo para cada feature
    var vectorLayer = new ol.layer.Vector({
      source: vectorSource,
      style: styleFunction
    });

    // Defina o índice Z para garantir que a camada esteja acima de todas as outras
    vectorLayer.setZIndex(1000);

    // Adicione a camada ao mapa
    map.addLayer(vectorLayer);

    // Ajuste o zoom do mapa para se ajustar à extensão das features
    map.getView().fit(vectorSource.getExtent(), { size: map.getSize(), duration: 1000 });
  } else {
    alert('Nenhum GeoJSON fornecido.');
  }
}
