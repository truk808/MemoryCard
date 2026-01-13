const {
    Publication,
    Group,
    Module,
    Card,
    Tag,
    ModuleCard,
    GroupModule,
} = require('../models/models');

export async function copyGroup(publicationId: number, userId: number) {

    // 1️⃣ Получаем публикацию
    const publication = await Publication.findByPk(publicationId);
    if (!publication || publication.entityType !== 'group') {
        throw new Error('Publication not found');
    }


    // 2️⃣ Получаем группу с модулями, картами и тегами
    const group = await Group.findByPk(publication.entityId, {
        include: {
            model: Module,
            include: [
                { model: Card, include: [Tag] }
            ]
        }
    });

    if (!group) throw new Error('Group not found');

    // console.log('1212121212121')
    // console.log(publicationId, userId)
    // return

    // 3️⃣ Создаём новую группу
    const newGroup = await Group.create({
        name: group.name,
        description: group.description,
        img: group.img,
        userId
    });

    // 4️⃣ Копируем модули и карты
    for (const module of group.modules) {
        const newModule = await Module.create({
            name: module.name,
            icon: module.icon,
            userId
        });

        for (const card of module.cards) {
            const newCard = await Card.create({
                term: card.term,
                meaning: card.meaning,
                example_sentence: card.example_sentence,
                level: 0,
                userId
            });

            // 5️⃣ Копируем теги
            for (const tag of card.tags) {
                const [newTag] = await Tag.findOrCreate({
                    where: { name: tag.name, userId },
                    defaults: { name: tag.name, userId }
                });

                await newCard.addTag(newTag);
            }

            await newModule.addCard(newCard);
        }

        await newGroup.addModule(newModule);
    }

    // 6️⃣ Увеличиваем счетчик скачиваний
    await publication.increment('downloadCount');

    return newGroup;
}
