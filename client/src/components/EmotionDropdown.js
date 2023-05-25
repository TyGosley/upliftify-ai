import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const emotions = [
  'Happy',
  'Sad',
  'Angry',
  'Awesome',
  'Rad',
  'Content',
  'Hopeful',
  'Prideful',
  'Fear',
  'Disgust',
  'Anxious',
  'Guilty',
  'Depressed',
  'Grief',
  'Lonely',
];

const recommendations = {
  Happy: [
    "Practice gratitude: Take a few moments each day to reflect on the things you're grateful for. This simple practice can help shift your focus to the positive aspects of your life and boost your overall happiness.",
    "Engage in physical activity: Regular exercise has been shown to release endorphins, which are natural mood enhancers. Find an activity you enjoy, whether it's jogging, dancing, or playing a sport, and incorporate it into your routine to experience the mood-lifting benefits.",
    'Connect with loved ones: Spending time with family and friends can greatly contribute to happiness. Plan social activities, organize get-togethers, or simply reach out to loved ones for a chat. Building and maintaining meaningful connections can bring joy and a sense of belonging.',
    "Engage in hobbies or passions: Pursuing activities you're passionate about can bring a deep sense of happiness and fulfillment. Whether it's painting, playing an instrument, writing, or any other hobby, make time for the things you love and allow yourself to experience joy through them.",
    'Practice self-care: Taking care of yourself is crucial for overall well-being and happiness. Prioritize self-care activities like getting enough sleep, eating nourishing foods, practicing mindfulness or meditation, and engaging in activities that help you relax and recharge. Remember to be kind to yourself and make self-care a priority in your daily routine.',
  ],
  Sad: [
    'Allow yourself to feel and process your emotions: Give yourself permission to experience and acknowledge your emotions without judgment.',
    'Seek support from loved ones or a therapist: Reach out to trusted friends, family, or professionals who can provide emotional support and guidance.',
    'Engage in activities that bring comfort and solace: Engage in activities that provide you comfort and help uplift your mood, such as listening to soothing music or spending time in nature.',
    'Practice self-compassion and self-care: Treat yourself with kindness and prioritize self-care activities that nurture your emotional well-being.',
    'Express your emotions through creative outlets: Use creative outlets such as writing, painting, or playing music to express and release your emotions.',
  ],
  Angry: [
    'Identify and understand the source of your anger: Reflect on the underlying causes of your anger and gain clarity on what triggers your emotions.',
    'Practice deep breathing and relaxation techniques: Use deep breathing exercises and relaxation techniques to calm your mind and body during moments of anger.',
    'Express your anger assertively, not aggressively: Find healthy ways to express your anger and communicate your feelings assertively and constructively.',
    'Find healthy outlets for your anger: Engage in physical activities, such as exercising or practicing martial arts, to channel and release your anger in a constructive manner.',
    'Seek professional help if necessary: If anger becomes overwhelming or difficult to manage, consider seeking support from a therapist or counselor.',
  ],
  Awesome: [
    'Celebrate your achievements and successes: Acknowledge your accomplishments, big or small, and take time to celebrate and appreciate your progress.',
    'Surround yourself with positive and supportive people: Surround yourself with individuals who uplift and inspire you, and create a positive and encouraging environment.',
    'Take time to appreciate and enjoy the present moment: Practice mindfulness and gratitude to fully experience and savor the present moment.',
    'Challenge yourself with new goals and experiences: Set challenging but attainable goals that push you out of your comfort zone and foster personal growth.',
    'Practice self-care and self-love regularly: Prioritize self-care activities that nurture your physical, mental, and emotional well-being.',
  ],
  Rad: [
    'Express yourself creatively through art, music, or writing: Engage in creative outlets that allow you to express your unique self and tap into your creativity.',
    'Engage in activities that give you an adrenaline rush: Try adventurous activities or sports that provide excitement and a sense of thrill.',
    'Connect with like-minded individuals who share your interests: Seek out communities or groups that align with your passions and interests.',
    'Try something new and exciting that pushes your boundaries: Step out of your comfort zone and explore new experiences that challenge and inspire you.',
    'Spread positivity and kindness to others: Practice acts of kindness and make a positive impact on the lives of others, which can amplify your own sense of awesomeness.',
  ],
  Content: [
    'Practice mindfulness and be fully present in the moment: Focus on the present moment, letting go of worries about the past or future.',
    'Spend quality time with loved ones and cherish those relationships: Nurture and strengthen your relationships by spending meaningful time with the people you care about.',
    'Engage in hobbies and activities that bring you joy and relaxation: Dedicate time to activities that you enjoy and that bring a sense of fulfillment and contentment.',
    "Express gratitude for the things you have and the experiences you've had: Regularly acknowledge and appreciate the blessings and positive aspects of your life.",
    'Maintain a healthy work-life balance and prioritize self-care: Ensure that you allocate time for self-care activities, rest, and relaxation to maintain a sense of contentment and well-being.',
  ],
  Hopeful: [
    'Set achievable goals and work towards them: Set specific, realistic goals that align with your aspirations and take consistent steps to achieve them.',
    'Surround yourself with positive and supportive people: Surround yourself with individuals who believe in you and support your dreams and aspirations.',
    'Visualize your desired outcomes and focus on the possibilities: Create a clear mental image of your desired future and visualize yourself successfully achieving your goals.',
    'Practice positive affirmations and self-talk: Use positive affirmations and self-talk to reinforce your belief in your abilities and foster a positive mindset.',
    'Take small steps to confront your fears gradually and safely: Break down your fears into smaller, manageable steps and gradually expose yourself to them, building confidence along the way.',
  ],
  Prideful: [
    "Reflect on your achievements and the obstacles you've overcome: Take time to reflect on your accomplishments and the challenges you've successfully tackled.",
    'Take time to appreciate and celebrate your strengths and unique qualities: Recognize and appreciate the qualities that make you special and celebrate them.',
    'Share your accomplishments with others and celebrate together: Share your successes with loved ones and allow them to join in celebrating your achievements.',
    'Set new challenges and goals to continue growing and achieving: Set new goals that push you further and keep you motivated on your journey of personal growth.',
    'Support and uplift others: Offer support and encouragement to others in their endeavors, and experience pride through their successes as well.',
  ],
  Fear: [
    'Identify the specific fears or triggers causing your anxiety: Pinpoint the root causes of your fears and anxieties to better understand and address them.',
    'Practice deep breathing exercises and mindfulness to calm your mind: Utilize deep breathing techniques and mindfulness practices to alleviate anxiety and promote relaxation.',
    'Challenge negative thoughts and replace them with positive affirmations: Challenge and reframe negative thoughts with positive affirmations and realistic perspectives.',
    'Take small steps to confront your fears gradually and safely: Break down your fears into manageable steps and gradually expose yourself to them, building confidence along the way.',
    'Seek support from loved ones or a therapist: Reach out to trusted individuals who can provide support and guidance as you navigate your fears and anxieties.',
  ],
  Disgust: [
    'Identify the source of your disgust and reflect on its underlying causes: Explore the reasons behind your feelings of disgust and consider how they may be connected to personal values or past experiences.',
    'Practice self-compassion and acceptance: Treat yourself with kindness and understanding, recognizing that feelings of disgust are natural and do not define your worth.',
    'Engage in self-care activities that promote self-worth: Prioritize activities that nourish your self-esteem and self-image, such as practicing self-care rituals or engaging in hobbies that make you feel good about yourself.',
    "Surround yourself with positivity: Create an environment that is conducive to positive emotions and thoughts, whether it's through uplifting music, inspirational books, or spending time with supportive people.",
    'Challenge negative thoughts and beliefs: Challenge any negative or irrational beliefs that contribute to feelings of disgust and work on replacing them with more realistic and positive perspectives.',
  ],
  Anxious: [
    'Practice deep breathing and relaxation techniques: Incorporate deep breathing exercises, progressive muscle relaxation, or meditation into your daily routine to help calm anxiety symptoms.',
    'Challenge anxious thoughts with evidence-based thinking: Question the validity of your anxious thoughts and seek evidence that supports or contradicts them, helping you gain a more balanced perspective.',
    'Establish a consistent self-care routine: Prioritize self-care activities that promote relaxation, such as taking warm baths, engaging in hobbies, or spending time in nature.',
    'Seek support from a therapist or counselor: Consult with a mental health professional who can provide guidance, support, and evidence-based strategies for managing anxiety.',
    'Break tasks into smaller, manageable steps: When facing overwhelming tasks or situations, break them down into smaller, more manageable steps to reduce anxiety and enhance feelings of control.',
  ],
  Guilty: [
    'Acknowledge and accept your feelings of guilt: Recognize that guilt is a normal emotional response and allow yourself to experience and process these feelings.',
    'Make amends or seek forgiveness if appropriate: Take necessary steps to make amends or seek forgiveness from those you may have harmed or wronged, if appropriate and possible.',
    'Practice self-forgiveness and self-compassion: Treat yourself with kindness and understanding, offering forgiveness and compassion to yourself for past mistakes.',
    'Learn from the experience and commit to personal growth: Use the experience as an opportunity for growth and learning, identifying how you can make better choices and avoid similar situations in the future.',
    'Engage in acts of kindness and service: Perform acts of kindness and service to others as a way to make a positive impact, which can help alleviate feelings of guilt and contribute to personal growth.',
  ],
  Depressed: [
    'Seek professional help: Reach out to a mental health professional who can provide appropriate support, therapy, or medication for managing depression.',
    'Build a support network: Surround yourself with caring and understanding individuals who can offer emotional support and encouragement during difficult times.',
    'Engage in regular physical exercise: Incorporate regular exercise into your routine as it can help boost mood and release endorphins, which are natural mood enhancers.',
    'Practice self-care and self-compassion: Prioritize self-care activities that nourish your mind, body, and soul, such as practicing mindfulness, engaging in hobbies, or pampering yourself.',
    'Set small, achievable goals: Break down larger tasks into smaller, more manageable goals to create a sense of accomplishment and progress.',
  ],
  Grief: [
    'Allow yourself to grieve and honor your emotions: Give yourself permission to experience and express your grief in a way that feels authentic to you.',
    'Seek support from loved ones, support groups, or therapy: Reach out to trusted individuals who can provide emotional support and understanding during the grieving process.',
    'Engage in self-care activities that promote healing and self-nurturing: Prioritize self-care practices that nourish your emotional well-being, such as journaling, taking walks in nature, or engaging in art therapy.',
    "Create rituals or memorials to honor and remember your loss: Establish rituals or engage in activities that hold meaning for you and help commemorate and honor your loved one or the loss you're experiencing.",
    'Be patient with yourself and allow time for healing: Recognize that grief is a process and that healing takes time. Be patient and gentle with yourself as you navigate through your grief journey.',
  ],
  Lonely: [
    'Reach out to loved ones or join social groups: Initiate contact with friends, family, or acquaintances to nurture relationships and create opportunities for connection.',
    'Engage in activities that align with your interests and passions: Join clubs, organizations, or communities centered around activities you enjoy, providing opportunities to meet like-minded individuals.',
    'Volunteer or engage in acts of service: Contribute to your community by volunteering for causes that resonate with you, fostering a sense of purpose and connection.',
    'Practice self-compassion and self-care: Treat yourself with kindness and prioritize activities that nourish your emotional well-being, such as engaging in hobbies, practicing mindfulness, or seeking professional help if needed.',
    'Explore new avenues for social interaction: Join online communities or participate in virtual events and workshops that allow for meaningful connections and interactions with others.',
  ],
};

const emotionDefinitions = {
  Happy: 'Feeling or showing pleasure or contentment.',
  Sad: 'Feeling or showing sorrow; unhappy.',
  Angry: 'Feeling or showing strong annoyance, displeasure, or hostility.',
  Awesome: 'Feeling awesome and extraordinary.',
  Rad: 'Feeling cool, amazing, and impressive.',
  Content: 'Feeling in a state of peaceful happiness.',
  Hopeful: 'Feeling optimistic and confident about the future.',
  Prideful: "Feeling a sense of deep pleasure or satisfaction derived from one's own achievements.",
  Fear: 'Feeling afraid; frightened.',
  Disgust: 'Feeling a strong distaste or aversion; to find something extremely unpleasant.',
  Anxious: 'Feeling or showing worry, nervousness, or unease about something with an uncertain outcome.',
  Guilty: 'Feeling culpable of or responsible for a specified wrongdoing.',
  Depressed: 'Feeling in a state of general unhappiness or despondency.',
  Grief: "Feeling deep sorrow, especially that caused by someone's death.",
  Lonely: 'Feeling sad and unhappy about being socially isolated.',
};

function EmotionDropdown() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [randomRecommendation, setRandomRecommendation] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(true);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setRandomRecommendation(getRandomRecommendation(item));
    setDropdownVisible(true); // Hide the dropdown menu after an item is selected
  };

  const getRandomRecommendation = (emotion) => {
    const recommendationsForEmotion = recommendations[emotion];
    return recommendationsForEmotion[Math.floor(Math.random() * recommendationsForEmotion.length)];
  };

  const renderDropdownItems = () => {
    return emotions.map((item, index) => (
      <Dropdown.Item key={index} onClick={() => handleItemClick(item)}>
        <input type="checkbox" checked={selectedItem === item} readOnly />
        {item}
      </Dropdown.Item>
    ));
  };

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          How are you feeling today?
        </Dropdown.Toggle>
        {dropdownVisible && ( // Render the dropdown menu only if it's visible
          <Dropdown.Menu className="scrollable-dropdown">
            <div className="dropdown-container">{renderDropdownItems()}</div>
          </Dropdown.Menu>
        )}
      </Dropdown>
      {selectedItem && (
        <div className="result-container">
          <div className="result-text">
            <p>My Emotion: {selectedItem}</p>
            <p>Definition: {emotionDefinitions[selectedItem]}</p>
            <p>Try this: {randomRecommendation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmotionDropdown;