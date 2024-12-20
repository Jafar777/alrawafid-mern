import React from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

export default function About() {
  const images = [
    
    'https://github.com/Jafar777/alrawafid-mern/blob/main/client/src/assets/airconditioner1.jpg?raw=true',
    'https://github.com/Jafar777/alrawafid-mern/blob/main/client/src/assets/construction.jpg?raw=true',
    'https://github.com/Jafar777/alrawafid-mern/blob/main/client/src/assets/projectmanagement.jpg?raw=true',
    'https://github.com/Jafar777/alrawafid-mern/blob/main/client/src/assets/aluminumandstructure.jpg?raw=true',
    'https://github.com/Jafar777/alrawafid-mern/blob/main/client/src/assets/decorationAndPainting.jpg?raw=true',
    'https://github.com/Jafar777/alrawafid-mern/blob/main/client/src/assets/Facilitiesmaintenance.jpg?raw=true',
    'https://github.com/Jafar777/alrawafid-mern/blob/main/client/src/assets/realestate.jpg?raw=true'
];
  return (
    
    
    
      <div className=''>
      <Slide>
            <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[0]})` }}>
                    <span className='bg-transparent'>نقدم احدث خدمات التكييف والتبريد والتهوية</span>
                </div>
            </div>
            <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[1]})` }}>
                    <span className='bg-transparent'>نقدم خدمات المقاولات</span>
                </div>
            </div>
            <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[2]})` }}>
                    <span className='bg-transparent'>نقدم خدمات ادارة المشاريع</span>
                </div>
            </div>
            <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[3]})` }}>
                    <span className='bg-transparent'> تركيب أنظمة الألمنيوم والاستركشر </span>
                </div>
            </div>
            <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[4]})` }}>
                    <span className='bg-transparent'> نقدم خدمة الدهانات والديكورات </span>
                </div>
            </div>
            <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[5]})` }}>
                    <span className='bg-transparent'> صيانة المنشئات</span>
                </div>
            </div>
            <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[6]})` }}>
                    <span className='bg-transparent'> التسويق والوساطة العقارية</span>
                </div>
            </div>
        </Slide>


        <div id='arabic' className='flex flex-col mt-16 mb-16 '>
          <h1 className='mx-auto text-3xl custom-font-color3'>نبذة عن مجموعة الروافد التجارية</h1>

          <div>
            <h2 className='custom-font-color1 text-2xl mr-1'>من نحن؟</h2>
            <p className='mt-3 mb-3 mr-3 ml-3 text-xl custom-font-color3'>
              تأسست مجموعة الروافد التجارية لتصبح أحد الرواد في مجال التسويق العقاري والعلاقات العامة و المقاولات العامة وإدارة وتنفيذ 
              مشاريع الكبرى في المملكة العربية السعودية. منذ انطلاقتنا، تركنا بصمة مميزة عبر تنفيذ مشاريع ضخمة ومتنوعة، مما يعكس التزامنا الدائم بتطبيق سياسات مدروسة تقوم على أسس علمية دقيقة. بفضل خبراتنا الممتدة لأكثر من عقد، نجحنا في تحقيق توازن مثالي بين الجودة والكفاءة، مما يعزز مكانتنا كشريك موثوق  .
              
            </p>
          </div>
          <div>
            <h2 className='custom-font-color1 text-2xl mr-1'>رؤيتنا :</h2>
            <p className='mt-3 mb-3 mr-3 ml-3 text-xl custom-font-color3'>نسعى لأن نكون في طليعة المجموعات الرائدة في تقديم الحلول المتكاملة في شتى الخدمات التي نقدمها , مع التركيز على الابتكار وتطبيق أعلى معايير الجودة. رؤيتنا تتمثل في تعزيز التنمية المستدامة من خلال تنفيذ مشاريع تحقق التوازن بين التطور المعماري والاحتياجات المجتمعية، ملتزمين بالتميز في كل جانب من جوانب عملنا.</p>
          </div>
          <div>
            <h2 className='custom-font-color1 text-2xl mr-1'>أهدافنا :</h2>
            <p className='mt-3 mb-3 mr-3 ml-3 text-xl custom-font-color3'>خلق بيئة عمل متكاملة: نؤمن بأن نجاحنا يعتمد على استثمار الكفاءات البشرية المؤهلة، لذا نوفر بيئة عمل محفزة تجمع بين الخبرات المحلية والدولية.
            استخدام أحدث التقنيات: نستخدم أحدث الابتكارات الهندسية والتكنولوجية لضمان تنفيذ مشاريع تتوافق مع معايير الجودة العالمية، وتواكب متطلبات التطور السريع الذي يشهده السوق السعودي.
            الاستدامة والتنمية: نعمل على المساهمة الفعالة في مسيرة التطوير الشاملة التي تعيشها المملكة، متبعين نهجًا مستدامًا يعزز الاستثمارات طويلة الأمد ويدعم الرؤية الوطنية 2030.</p>
          </div>
          <div>
            <h2 className='custom-font-color1 text-2xl mr-1'> خدماتنا :</h2>
            <p className='mt-3 mb-3 mr-3 ml-3 text-xl custom-font-color3'>المقاولات العامة: تنفيذ المشاريع السكنية والتجارية بأعلى مستويات الجودة منذ عام 2005.
              أنظمة التكييف والتبريد والتهوية: تقديم حلول متطورة تضمن راحة العملاء وكفاءة استخدام الطاقة.
              أنظمة الألمنيوم والاستركشر وأعمال الكلايدينغ: تصميم وتنفيذ واجهات مبتكرة تجمع بين الجمال والاستدامة.
              الديكورات والدهانات: تصاميم داخلية وخارجية فريدة تعكس الأذواق المتنوعة وتضمن أعلى معايير التشطيب.</p>
          </div>
          <div>
            <h2 className='custom-font-color1 text-2xl mr-1'>قيمنا :</h2>
            <p className='mt-3 mb-3 mr-3 ml-3 text-xl custom-font-color3'>في مجموعة الروافد التجارية, نلتزم بمجموعة من القيم الراسخة التي توجه كل جانب من أعمالنا وتساهم في تحقيق رؤيتنا:
            <ul>
            <li>الالتزام بالمواعيد: نلتزم بتسليم المشاريع في الوقت المحدد وفقًا للجداول الزمنية المتفق عليها، مع الحفاظ على أعلى معايير الجودة.</li>
              <li>الجودة والتميز: نضع الجودة في صدارة أولوياتنا، حيث نحرص على تطبيق أعلى المعايير في جميع مراحل تنفيذ المشاريع، من التخطيط إلى التسليم.</li>
              <li>الشفافية والمصداقية: نؤمن بأهمية الوضوح والثقة في التعامل مع عملائنا وشركائنا، مما يعزز علاقاتنا طويلة الأمد.</li>
              <li>الابتكار والتطور: نعتمد على الابتكار واستخدام أحدث التقنيات لضمان تنفيذ حلول عصرية ومستدامة تلبي تطلعات عملائنا.</li>
              <li>الاستدامة والمسؤولية: نعمل بجد نحو تحقيق التنمية المستدامة، مع مراعاة الأثر البيئي والاجتماعي لمشاريعنا، ملتزمين بمسؤوليتنا تجاه المجتمع.</li>
            </ul>

          هذه القيم تمثل الأساس الذي نبني عليه كل مشروع، مما يعزز ثقة عملائنا بنا كشريك ملتزم بالتميز والاحترافية.</p>
          </div>
          <div>
            <h2 className='custom-font-color1 text-2xl mr-1'>خدمات مجموعة الروافد التجارية</h2>
            <p className='mt-3 mb-3 mr-3 ml-3 text-xl custom-font-color3'>تقدم مجموعة الروافد التجارية مجموعة شاملة من الخدمات المتكاملة التي تلبي احتياجات السوق العقاري في المملكة العربية السعودية. تتميز خدماتنا بالاحترافية والجودة العالية، مما يجعلنا الخيار الأمثل لعملائنا.</p>
          </div>
          
          
         
          
        </div>
        </div>
    
  )
}
