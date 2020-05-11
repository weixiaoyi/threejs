import React, {useEffect} from 'react';
import THREE from './library'

function App() {
  useEffect(()=>{
    /**
     * 创建场景对象Scene
     */
    var scene = new THREE.Scene();

    var axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);

    // 立方体网格模型
    var geometry1 = new THREE.BoxGeometry(100, 100, 100);
    var material1 = new THREE.MeshLambertMaterial({
      color: 0x0000ff
    }); //材质对象Material
    var mesh1 = new THREE.Mesh(geometry1, material1); //网格模型对象Mesh
    scene.add(mesh1); //网格模型添加到场景中

    // 球体网格模型
    var geometry2 = new THREE.SphereGeometry(60, 40, 40);
    var material2 = new THREE.MeshLambertMaterial({
      color:0xff0000,
      opacity:0.7,
      transparent:true,
    });
    var mesh2 = new THREE.Mesh(geometry2, material2); //网格模型对象Mesh
    mesh2.translateY(220); //球体网格模型沿Y轴正方向平移120
    mesh2.scale.set(0.5, 0.5, 0.5)

    scene.add(mesh2);

    // 圆柱网格模型
    var geometry3 = new THREE.CylinderGeometry(50, 50, 100, 25);
    var material3 = new THREE.MeshPhongMaterial({
      color:0x0000ff,
      specular:0x4488ee,
      shininess:12
    });//材质对象
    var mesh3 = new THREE.Mesh(geometry3, material3); //网格模型对象Mesh
     // mesh3.translateX(120); //球体网格模型沿Y轴正方向平移120
    mesh3.position.set(120,0,0);//设置mesh3模型对象的xyz坐标为120,0,0
    scene.add(mesh3); //

    var geometry4 = new THREE.SphereGeometry(100, 25, 25);//球体
// 直线基础材质对象
    var material4 = new THREE.LineDashedMaterial({
      color: 0x0000ff,
      dashSize: 10,//显示线段的大小。默认为3。
      gapSize: 5,//间隙的大小。默认为1
    });
    var line = new THREE.Line(geometry4, material4); //线模型对象
//  computeLineDistances方法  计算LineDashedMaterial所需的距离数组
    line.computeLineDistances();
    scene.add(line); //点模型添加到场景中

    var path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-10, -50, -50),
      new THREE.Vector3(10, 0, 0),
      new THREE.Vector3(8, 50, 50),
      new THREE.Vector3(-5, 0, 100)
    ]);
// path:路径   40：沿着轨迹细分数  2：管道半径   25：管道截面圆细分数
    var geometry21 = new THREE.TubeGeometry(path, 40, 10, 25);

    var material21 = new THREE.MeshLambertMaterial({
      color: 0x0000ff,
      side:THREE.DoubleSide
    }); //材质对象Material
    var mesh21 = new THREE.Mesh(geometry21, material21); //网格模型对象Mesh
    mesh21.position.set(320,0,0);//设置mesh3模型对象的xyz坐标为120,0,0
    scene.add(mesh21); //网格模型添加到场景中


    var points = [
      new THREE.Vector2(50,60),
      new THREE.Vector2(25,0),
      new THREE.Vector2(50,-60)
    ];
    var geometry22 = new THREE.LatheGeometry(points,30);
    var material22=new THREE.MeshPhongMaterial({
      color:0x0000ff,//三角面颜色
      side:THREE.DoubleSide//两面可见
    });//材质对象
    var mesh22=new THREE.Mesh(geometry22,material22);//旋转网格模型对象
    mesh22.position.set(0,320,0);//设置mesh3模型对象的xyz坐标为120,0,0

    scene.add(mesh22);//旋转网格模型添加到场景中



    /**
     * 光源设置
     */
        //点光源
    var point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中



    //环境光
    var ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);
    // console.log(scene)
    // console.log(scene.children)
    /**
     * 相机设置
     */
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 300, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
    /**
     * 创建渲染器对象
     */
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);//设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    document.getElementById('myApp').appendChild(renderer.domElement); //body元素中插入canvas对象
    //执行渲染操作   指定场景、相机作为参数
    function render() {
      renderer.render(scene,camera);//执行渲染操作
      // mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
      // requestAnimationFrame(render);//请求再次执行渲染函数render
    }
    render();

    var controls = new THREE.OrbitControls(camera,renderer.domElement);//创建控件对象
    controls.addEventListener('change', render)

  },[])

  return (
    <div id='myApp' />
  );
}

export default App;
